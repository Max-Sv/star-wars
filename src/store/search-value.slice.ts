import { configureStore, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResult } from '../models/models';
import httpService from '../services/http.service';
import LocalStorageService from '../services/local-storage.service';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';
export enum UrlType {
  init,
  search,
  common,
}
export interface IUrl {
  currentPage: number;
  itemPerPage: number;
  type: UrlType;
}
const apiCard = createApi({
  reducerPath: 'apiCard',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  tagTypes: ['Cards'],
  endpoints(build) {
    // const { cards } = getState() as RootState;
    // console.log('-> cards', cards);
    return {
      fetchCards: build.query({
        query({ currentPage = 1, itemPerPage = 20 }) {
          return `?page=${currentPage}&per_page=${itemPerPage}`;
        },
        providesTags: ['Cards'],
      }),
      searchCards: build.query({
        query(query: string = '') {
          console.log('-> query', query);

          return `?beer_name=${query}`;
        },
        // invalidatesTags: ['Cards'],
        // providesTags: (result, error, arg) => {
        //   console.log('-> arg', arg);
        //   console.log('-> error', error);
        //   console.log('-> result', result);
        //   return result;
        // },
      }),
    };
  },
});

// export const fetchCards = createAsyncThunk('cards/fetchCards', async (_, { getState }) => {
//   const { cards } = getState() as RootState;
//   console.log('-> cards', cards);
//
//   // dispatch(setSearchValue(searchData));
//   return await httpService.getData({
//     currentPage: cards.url?.currentPage || 1,
//     itemPerPage: cards.url?.itemPerPage || 20,
//   });
// });

// export const searchCards = createAsyncThunk('cards/searchCards', async (_, { getState }) => {
//   const { cards } = getState() as RootState;
//   const response = await httpService.search(cards.searchValue);
//   LocalStorageService.setData(cards.searchValue);
//   return { response };
// });

// const counterSlice = createSlice({
//   name: 'searchValue',
//   initialState: '' as string,
//   reducers: {
//     setSearchValue: {
//       reducer: (state, action: PayloadAction<string>) => action.payload,
//       prepare: (value?: string) => ({ payload: value || '' }),
//     },
//   },
// });
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
  url: null,
};

const cardsSlice = createSlice({
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
        console.log('-> payload', payload);
        console.log('-> 11state', state.data);
        console.log('-> 11state', state.loading);
        console.log('-> 11state', state.searchValue);
        state.loading = false;
        state.data = payload;
        state.searchValue = '';
        // localStorageService.setData(payload.searchValue);
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
        console.log('-> payload', payload);
        console.log('-> state', state);

        state.loading = false;
        state.data = payload.response;
        state.url = null;
        // state.searchValue = payload.searchValue;
        // LocalStorageService.setData(payload.searchValue);
      })
      .addMatcher(apiCard.endpoints?.searchCards.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiCard.endpoints?.searchCards.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });

    // builder
    //   .addCase(searchCards.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(searchCards.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     state.data = payload.response;
    //     state.url = null;
    //     // state.searchValue = payload.searchValue;
    //     // localStorageService.setData(payload.searchValue);
    //   })
    //   .addCase(searchCards.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'An error occurred';
    //   })
    //   .addCase(fetchCards.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchCards.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     state.data = payload;
    //     state.searchValue = '';
    //     // localStorageService.setData(payload.searchValue);
    //   })
    //   .addCase(fetchCards.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'An error occurred';
    //   });
  },
});

export const store = configureStore({
  reducer: {
    // searchValue: counterSlice.reducer,
    cards: cardsSlice.reducer,

    [apiCard.reducerPath]: apiCard.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiCard.middleware);
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const { setSearchValue, setCurrentPage, setItemPerPage, setUrl } = cardsSlice.actions;
export const { useFetchCardsQuery, useSearchCardsQuery } = apiCard;
