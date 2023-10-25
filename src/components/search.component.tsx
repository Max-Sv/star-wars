import { Component, ChangeEvent } from 'react';

interface ISearchProps {
  queryChanged: (val: ISearchState) => void;
  initQuery: string | null;
}

export interface ISearchState {
  value: string;
  error: boolean;
}
export class SearchComponent extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = { value: props.initQuery || '', error: false };
  }

  onInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value.trim() || '' });
  }

  handleErrorButtonClick() {
    this.setState({ error: true });
  }
  render() {
    if (this.state.error) {
      throw new Error('Error: oops!');
    }
    return (
      <>
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
            title="search!"
            onClick={() => {
              this.props.queryChanged(this.state);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="error-button"
          type="button"
          title="click to get error"
          onClick={this.handleErrorButtonClick.bind(this)}
        >
          Error
        </button>
      </>
    );
  }
}
