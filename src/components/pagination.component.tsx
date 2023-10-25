import { Component } from 'react';
import { API_URL, PAGE_OBJECT_NUMBER } from '../config';
import { IState } from '../models/models';

interface IPaginationData extends Omit<IState, 'results'> {}

interface IPaginationProps {
  paginationClick: (url: string) => void;
  data: IPaginationData;
}

export class PaginationComponent extends Component<IPaginationProps> {
  paginationArray: number[];
  selectedValue: number;

  constructor(props: IPaginationProps) {
    super(props);
    const { data } = props;
    this.paginationArray = Array.from(
      { length: Math.ceil(data.count / PAGE_OBJECT_NUMBER) },
      (_, i) => i + 1
    );

    this.selectedValue = this.getSelectedObject(data.next, data.previous);
  }

  onPaginationClick(objNumber: number): void {
    const updatedUrl = this.props.data.next || this.props.data.previous || API_URL;
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
  onNextPrevClick(urlKey: keyof IPaginationData): void {
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
