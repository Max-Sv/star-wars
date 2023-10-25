import { Component, ChangeEvent } from 'react';

interface ISearchProps {
  queryChanged: (val: { value: string }) => void;
  initQuery: string | null;
}

export interface ISearchState {
  value: string;
}
export class SearchComponent extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = { value: props.initQuery || '' };
  }

  onInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value.trim() || '' });
  }
  render() {
    return (
      <div className="search-block">
        <label htmlFor="name">Let{"'"}s try to find a character from star Wars :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={this.state.value}
          onChange={this.onInputChange.bind(this)}
        />
        <button
          type="button"
          onClick={() => {
            this.props.queryChanged(this.state);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
