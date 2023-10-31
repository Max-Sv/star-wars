import { ChangeEvent, useState } from 'react';

interface ISearchProps {
  queryChanged: (val: ISearchState) => void;
  initQuery: string | null;
}

export interface ISearchState {
  value: string;
  error: boolean;
}
export function SearchComponent(props: ISearchProps) {
  const [searchData, setSearchData] = useState<ISearchState>({
    value: props.initQuery || '',
    error: false,
  });
  // constructor(props: ISearchProps) {
  //   super(props);
  //   this.state = { value: props.initQuery || '', error: false };
  //   this.onInputChange = this.onInputChange.bind(this);
  //   this.handleErrorButtonClick = this.handleErrorButtonClick.bind(this);
  // }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setSearchData({ ...searchData, value });
  };

  const handleErrorButtonClick = () => {
    setSearchData({ ...searchData, error: true });
  };
  // render() {
  //   if (this.state.error) {
  //     throw new Error('Error: oops!');
  //   }
  return (
    <>
      <div className="search-block">
        <label htmlFor="name">Let{"'"}s try to find a character from star Wars :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={searchData.value}
          onChange={onInputChange}
        />
        <button
          type="button"
          title="search!"
          onClick={() => {
            props.queryChanged(searchData);
          }}
        >
          Search
        </button>
      </div>
      <button
        className="error-button"
        type="button"
        title="click to get error"
        onClick={handleErrorButtonClick}
      >
        Error
      </button>
    </>
  );
  // }
}
