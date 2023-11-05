import React from 'react';
interface IPaginationProps {
  paginationClick: (v: number) => void;
  perPageSelected: (v: number) => void;
  page: number;
  itemPerPage: number;
}

export function PaginationComponent({
  page,
  itemPerPage,
  paginationClick,
  perPageSelected,
}: IPaginationProps) {
  const options: { value: number; text: string }[] = [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 20, text: '20' },
    { value: 40, text: '40' },
  ];
  const onNextPrevClick = (newPage: number): void => {
    paginationClick(newPage);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    perPageSelected(+event.target.value);
  };

  return (
    <>
      <div className="per-page-block">
        <label htmlFor="per-page">Items Per Page: </label>
        <select value={itemPerPage} onChange={handleChange}>
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
          disabled={page <= 1}
          onClick={() => {
            onNextPrevClick(--page);
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
          {page}
        </button>
        <button
          type="button"
          title="next page"
          onClick={() => {
            onNextPrevClick(++page);
          }}
        >
          {'>'}
        </button>
      </div>
    </>
  );
}
