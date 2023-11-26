import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '@/config';
import { HYDRATE } from 'next-redux-wrapper';

export const apiCard = createApi({
  reducerPath: 'apiCard',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers) {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Cards'],
  endpoints(build) {
    return {
      fetchCards: build.query({
        query({ currentPage, itemPerPage }) {
          if (!currentPage && !itemPerPage) {
            return;
          }

          return `?page=${currentPage}&per_page=${itemPerPage}`;
        },
        providesTags: ['Cards'],
      }),
      searchCards: build.query({
        query(query: string = '') {
          if (!query) {
            return `?page=1&per_page=20`;
          }
          return `?beer_name=${query}`;
        },
        providesTags: ['Cards'],
      }),
      getCard: build.query({
        query(id: string = '') {
          return `${id}`;
        },
        providesTags: ['Cards'],
      }),
    };
  },
});

export const {
  useFetchCardsQuery,
  useSearchCardsQuery,
  useGetCardQuery,
  util: { getRunningQueriesThunk },
} = apiCard;
export const { getCard, fetchCards } = apiCard.endpoints;
