import React, { useEffect } from 'react';
import '../App.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {fetchCards, getRunningQueriesThunk, useFetchCardsQuery} from '@/store/slices/card-api.slice';
import { setUrl } from '@/store/slices/card.slice';
import RootLayout from "@/pages/layout";
import {wrapper} from "@/store/store";
import useQueryParams from "@/hooks/useQueryParams";

export default function App({}) {
  const dispatch = useAppDispatch();
  const url = useAppSelector(({ cards }) => cards.url);
  useFetchCardsQuery({ currentPage: url?.currentPage, itemPerPage: url?.itemPerPage });
  const { queryParams, setQueryParams } = useQueryParams<{
    search?: string;
    page?: string;
    per_page?: string;
  }>();
  const searchValue = useAppSelector(({ cards }) => cards.searchValue);


  useEffect(() => {
    if (!queryParams?.get('search')) {
      dispatch(
        setUrl({
          currentPage: 1,
          itemPerPage: 20,
        })
      );
      setQueryParams({ page: String(url?.currentPage), per_page: String(url?.itemPerPage) });
      return;
    }

    setQueryParams({ search: searchValue });
  }, [queryParams?.get('search')]);

  useEffect(() => {
    if (!url) {
      return;
    }

    setQueryParams({ page: String(url.currentPage), per_page: String(url.itemPerPage) });
  }, [url]);



  return <RootLayout/>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currentPage = context.query?.page || "1";
    const itemPerPage = context.query?.per_page || "20";
    if (typeof currentPage === "string" && typeof itemPerPage === "string") {
      store.dispatch(fetchCards.initiate({itemPerPage, currentPage}));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
