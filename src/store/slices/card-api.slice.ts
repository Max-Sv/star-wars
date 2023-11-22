import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../../config';
import LocalStorageService from '../../services/local-storage.service';

export const apiCard = createApi({
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
          LocalStorageService.setData(query);
          return `?beer_name=${query}`;
        },
        providesTags: ['Cards'],
      }),
    };
  },
});

export const { useFetchCardsQuery, useSearchCardsQuery } = apiCard;
