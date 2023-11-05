import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HttpService } from '../services/http.service';
import { IResult } from '../models/models';
import ScrollToTop from '../helpers/scroll-to-top';

export function ItemComponent() {
  const [item, setItem] = useState<IResult | null>(null);

  const httpService = new HttpService();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setItem(null);
    const id = location.pathname.split('/')[2];

    const fetchItem = async () => {
      return httpService.getItem(id);
    };

    fetchItem().then((res) => setItem(res));
  }, [location.pathname]);

  const onClickHandler = () => {
    navigate({ pathname: `/`, search: location.search });
  };
  return (
    <section className="item-section">
      <ScrollToTop />
      {item ? (
        <div className="item-block">
          <button className="active" type="button" onClick={onClickHandler}>
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
}
