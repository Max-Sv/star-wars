import { CardComponent } from './card.component';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/data.context';
import { useAppSelector } from '../store/hooks';
import { useFetchCardsQuery } from '../store/search-value.slice';
export function CardListComponent() {
  // const { cards } = useContext(DataContext);
  const cards = useAppSelector((state) => state.cards.data);
  console.log('-> cards', cards);
  const isLoading = useAppSelector((state) => state.cards.loading);
  // const { data = [], isLoading } = useFetchCardsQuery({ currentPage, itemPerPage });

  const location = useLocation();
  return (
    <>
      {!isLoading ? (
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
