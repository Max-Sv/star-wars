import { ChangeEvent, useState } from 'react';

interface ISearchProps {
  queryChanged: (val: ISearchState) => void;
  initQuery: string | null;
}

export interface ISearchState {
  value: string;
}
export function SearchComponent({ initQuery, queryChanged }: ISearchProps) {
  const [searchData, setSearchData] = useState<ISearchState>({
    value: initQuery || '',
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchData({ value });
  };

  return (
    <div className="search-block">
      <label htmlFor="name">Let{"'"}s try to find a BEER:</label>
      <input type="text" id="name" name="name" value={searchData.value} onChange={onInputChange} />
      <button
        type="button"
        title="search!"
        onClick={() => {
          queryChanged(searchData);
        }}
      >
        Search
      </button>
    </div>
  );
}
