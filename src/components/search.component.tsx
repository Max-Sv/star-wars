import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useSearchCardsQuery } from '../store/slices/card-api.slice';
import { setSearchValue } from '../store/slices/card.slice';
import { Link } from 'react-router-dom';
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
    dispatch(setSearchValue(searchData || ''));
  };

  return (
    <div>
      <div className="search-block">
        <label htmlFor="name">Let{"'"}s try to find a BEER:</label>
        <input type="text" id="name" name="name" value={searchData} onChange={handleChange} />
        <button type="button" title="search!" onClick={handleClick}>
          Search
        </button>
      </div>
      <nav>
        <Link to="uncontrolled-form">Uncontrolled form</Link>
      </nav>
      <nav>
        <Link to="controlled-form">Controlled form</Link>
      </nav>
    </div>
  );
};
