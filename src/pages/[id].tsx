import React from 'react';
import ScrollToTop from '../helpers/scroll-to-top';
import {getCard, getRunningQueriesThunk, useGetCardQuery} from '@/store/slices/card-api.slice';
import '../App.css';
import RootLayout from './layout';
import { useRouter } from "next/dist/client/router";
import {wrapper} from "@/store/store";
import {skipToken} from "@reduxjs/toolkit/query";

export default function ItemComponent({  }) {
  const router = useRouter();
  const id = router.query.id


  const result = useGetCardQuery(
    typeof id === "string" ? id : skipToken,
    {
      skip: router.isFallback,
    }
  );

  const { isLoading} = result;
  const data = result.data[0]

  return (
    <RootLayout>
      <section className="item-section">
        <ScrollToTop />
        {data || !isLoading ? (
          <div className="item-block">
            <button className="active" type="button" onClick={() => router.push(`/`)}>
              Close
            </button>
            <h2 className="item-title">{data?.name}</h2>
            <div className="item-content">
              <img src={data?.image_url} alt={data?.name}></img>
              <ul title={data?.name}>
                <li>Tagline: {data?.tagline}</li>
                <li>ABW: {data?.abv}%</li>
                <li>IBU: {data?.ibu}</li>
                <li>EBC: {data?.ebc}</li>
                <li>SRM: {data?.srm}</li>
                <li>Ph: {data?.ph}</li>
                <li>First brewed: {data?.first_brewed}</li>
              </ul>
            </div>
            <p>{data?.description}</p>
            <p>
              <b>Food pairing:</b>
            </p>
            {data?.food_pairing?.map((food: string, index: number) => <li key={index}>{food}</li>)}
          </div>
        ) : (
          <div className="loader">loading...</div>
        )}
      </section>
    </RootLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {

    const id = context.params?.id;

    if (typeof id === "string") {
      store.dispatch(getCard.initiate(id));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
