import { LoaderFunction, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IResult } from '../models/models';
import ScrollToTop from '../helpers/scroll-to-top';
import httpService from '../services/http.service';

export const ItemComponent = () => {
  const [item, setItem] = useState<IResult | null>(null);
  const data = useLoaderData() as IResult;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  useEffect(() => {
    setItem(data);
  }, [data]);

  return (
    <section className="item-section">
      <ScrollToTop />
      {item && !isLoading ? (
        <div className="item-block">
          <button
            className="active"
            type="button"
            onClick={() => navigate({ pathname: `/`, search: location.search })}
          >
            Close
          </button>
          <h2 className="item-title">{item.name}</h2>
          <div className="item-content">
            <img src={item.image_url} alt={item.name}></img>
            <ul title={item.name}>
              <li>Tagline: {item.tagline}</li>
              <li>ABW: {item.abv}%</li>
              <li>IBU: {item.ibu}</li>
              <li>EBC: {item.ebc}</li>
              <li>SRM: {item.srm}</li>
              <li>Ph: {item.ph}</li>
              <li>First brewed: {item.first_brewed}</li>
            </ul>
          </div>
          <p>{item.description}</p>
          <p>
            <b>Food pairing:</b>
          </p>
          {item?.food_pairing.map((food, index) => <li key={index}>{food}</li>)}
        </div>
      ) : (
        <div className="loader">loading...</div>
      )}
    </section>
  );
};
export const itemLoader: LoaderFunction = async ({ params }) => {
  const { itemId } = params;
  if (!itemId) {
    return;
  }
  return httpService.getItem(itemId);
};
