import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentPage, setItemPerPage } from '../store/slices/card.slice';

export const PaginationComponent = () => {
  const dispatch = useAppDispatch();
  const url = useAppSelector(({ cards }) => cards.url);

  const options: { value: number; text: string }[] = [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 20, text: '20' },
    { value: 40, text: '40' },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setItemPerPage(+event.target.value));
  };

  return (
    <>
      {url ? (
        <>
          <div className="per-page-block">
            <label htmlFor="per-page">Items Per Page: </label>
            <select data-testid="per-page" value={url?.itemPerPage} onChange={handleChange}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          <div className="pagination">
            <button
              type="button"
              title="previous page"
              disabled={url.currentPage <= 1}
              onClick={() => {
                dispatch(setCurrentPage(url.currentPage - 1));
              }}
            >
              {'<'}
            </button>
            <button
              className="active"
              disabled={true}
              type="button"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              {url.currentPage}
            </button>
            <button
              type="button"
              title="next page"
              onClick={() => {
                dispatch(setCurrentPage(url.currentPage + 1));
              }}
            >
              {'>'}
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};
