import { CardComponent } from './card.component';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/data.context';
export function CardListComponent() {
  const { cards } = useContext(DataContext);

  const location = useLocation();
  return (
    <>
      {cards ? (
        cards.length ? (
          cards.map((data, index) => {
            return <CardComponent key={index} data={data} search={location.search}></CardComponent>;
          })
        ) : (
          <span>No data 😞</span>
        )
      ) : (
        <span className="loader">loading...</span>
      )}
    </>
  );
}
