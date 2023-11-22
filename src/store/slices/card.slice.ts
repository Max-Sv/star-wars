import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResult } from '../../models/models';
import LocalStorageService from '../../services/local-storage.service';
import { apiCard } from './card-api.slice';

export interface IUrl {
  currentPage: number;
  itemPerPage: number;
}

interface CardState {
  data: IResult[];
  loading: boolean;
  error: string | null;
  searchValue: string;
  url: IUrl | null;
}

const initialCardState: CardState = {
  data: [],
  loading: false,
  error: null,
  searchValue: LocalStorageService.data || '',
  url: LocalStorageService.data
    ? null
    : {
        currentPage: 1,
        itemPerPage: 20,
      },
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialCardState,
  reducers: {
    setSearchValue: {
      reducer: (state, action: PayloadAction<string>) => ({
        ...state,
        searchValue: action.payload,
      }),
      prepare: (value: string) => ({ payload: value || '' }),
    },
    setCurrentPage: {
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        url: state.url
          ? {
              ...state.url,
              currentPage: action.payload,
            }
          : state.url,
      }),
      prepare: (value?: number) => ({ payload: value || 1 }),
    },
    setItemPerPage: {
      reducer: (state, action: PayloadAction<number>) => ({
        ...state,
        url: state.url
          ? {
              ...state.url,
              itemPerPage: action.payload,
              currentPage: 1,
            }
          : null,
      }),
      prepare: (value?: number) => ({ payload: value || 20 }),
    },
    setUrl: {
      reducer: (state, { payload }: PayloadAction<IUrl>) => ({
        ...state,
        url: { ...payload },
      }),
      prepare: (payload: IUrl) => ({ payload }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiCard.endpoints?.fetchCards.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.searchValue = '';
      })
      .addMatcher(apiCard.endpoints?.fetchCards.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiCard.endpoints?.fetchCards.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addMatcher(apiCard.endpoints?.searchCards.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addMatcher(apiCard.endpoints?.searchCards.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiCard.endpoints?.searchCards.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { setSearchValue, setCurrentPage, setItemPerPage, setUrl } = cardsSlice.actions;
