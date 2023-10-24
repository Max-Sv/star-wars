import { Component } from 'react';

interface ISearchProps {
  onInputChange: (val: { value: string }) => void;
}
export class SearchComponent extends Component<ISearchProps, { value: string }> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = { value: '' };
  }
  render() {
    return (
      <div>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={(e) => {
            this.setState({ value: e.target.value.trim() });
          }}
        />
        <button
          type="button"
          onClick={() => {
            this.props.onInputChange(this.state);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
