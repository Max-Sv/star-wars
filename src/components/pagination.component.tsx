import { Component } from 'react';
import { IState } from '../App';
import { API_URL } from '../services/http.service';

export const OBJECT_NUMBER = 10;
interface Pagination extends Omit<IState, 'results'> {}
export class PaginationComponent extends Component<{
  paginationClick: (url: string) => void;
  data: Pagination;
}> {
  paginationArray: number[];
  selectedValue: number;

  constructor(props: { paginationClick: (url: string) => void; data: Pagination }) {
    console.log('-> 111props', props);
    super(props);
    const { data } = props;
    this.paginationArray = Array.from(
      { length: Math.ceil(data.count / OBJECT_NUMBER) },
      (_, i) => i + 1
    );

    this.selectedValue = this.getSelectedObject(data.next, data.previous);
    console.log('-> this.selectedValue', this.selectedValue);
  }

  onPaginationClick(objNumber: number): void {
    const updatedUrl = this.props.data.next || this.props.data.previous || API_URL;

    // this.props.paginationClick(`https://swapi.dev/api/people/?page=${objNumber}`);
    this.props.paginationClick(updatedUrl.replace(/page=\d+/, `page=${objNumber}`));
  }
  getSelectedObject(next: string | null, prev: string | null): number {
    if (next) {
      return +next.slice(-1) - 1;
    }

    if (prev) {
      return +prev.slice(-1) + 1;
    }

    return 1;
  }
  onNextPrevClick(urlKey: keyof Pagination): void {
    if (!this.props.data[urlKey]) {
      return;
    }

    const url = this.props.data[urlKey] as string;
    this.props.paginationClick(url);
  }
  render() {
    return (
      <div className="pagination">
        <button
          type="button"
          title="previous page"
          disabled={!this.props.data.previous}
          onClick={() => {
            this.onNextPrevClick('previous');
          }}
        >
          {'<'}
        </button>
        {this.paginationArray.map((number) => {
          return (
            <button
              key={number}
              className={number === this.selectedValue ? 'active' : ''}
              type="button"
              onClick={() => {
                this.onPaginationClick(number);
              }}
            >
              {number}
            </button>
          );
        })}
        <button
          type="button"
          title="next page"
          disabled={!this.props.data.next}
          onClick={() => {
            this.onNextPrevClick('next');
          }}
        >
          {'>'}
        </button>
      </div>
    );
  }
}
