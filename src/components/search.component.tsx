import { ChangeEvent, useState } from 'react';
import { useDataContext } from '../context/data.context';

export const SearchComponent = () => {
  const { searchValue, setSearchValue } = useDataContext();
  const [searchData, setSearchData] = useState<string>(searchValue || '');

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchData(value);
  };

  return (
    <div className="search-block">
      <label htmlFor="name">Let{"'"}s try to find a BEER:</label>
      <input type="text" id="name" name="name" value={searchData} onChange={onInputChange} />
      <button
        type="button"
        title="search!"
        onClick={() => {
          setSearchValue(searchData);
        }}
      >
        Search
      </button>
    </div>
  );
};
