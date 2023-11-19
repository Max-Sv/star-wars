import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useSearchCardsQuery } from '../store/slices/card-api.slice';
import { setSearchValue } from '../store/slices/card.slice';

export const SearchComponent = () => {
  const searchValue = useAppSelector(({ cards }) => cards.searchValue);
  const dispatch = useAppDispatch();
  const [searchData, setSearchData] = useState<string>(searchValue);
  useSearchCardsQuery(searchValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchData(value);
  };

  const handleClick = () => {
    // test(searchData || '');

    dispatch(setSearchValue(searchData || ''));
  };

  return (
    <div className="search-block">
      <label htmlFor="name">Let{"'"}s try to find a BEER:</label>
      <input type="text" id="name" name="name" value={searchData} onChange={handleChange} />
      <button type="button" title="search!" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};
