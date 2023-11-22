import { CardComponent } from './card.component';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { IResult } from '../models/models';
export function CardListComponent() {
  const cards = useAppSelector((state) => state.cards.data);
  const isLoading = useAppSelector((state) => state.cards.loading);

  const location = useLocation();
  return (
    <>
      {!isLoading ? (
        cards.length ? (
          cards.map((data: IResult, index: number) => {
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
