import { API_URL, PAGE_OBJECT_NUMBER } from '../config';
import { IState } from '../models/models';

interface IPaginationData extends Omit<IState, 'results'> {}

interface IPaginationProps {
  paginationClick: (url: string) => void;
  data: IPaginationData;
}

export function PaginationComponent({ data, paginationClick }: IPaginationProps) {
  const paginationArray = Array.from(
    { length: Math.ceil(data.count / PAGE_OBJECT_NUMBER) },
    (_, i) => i + 1
  );
  const selectedValue: number = getSelectedObject(data.next, data.previous);

  // constructor(props: IPaginationProps) {
  //   super(props);
  //   const { data } = props;
  //   this.paginationArray = Array.from(
  //     { length: Math.ceil(data.count / PAGE_OBJECT_NUMBER) },
  //     (_, i) => i + 1
  //   );
  //
  //   this.selectedValue = this.getSelectedObject(data.next, data.previous);
  // }

  const onPaginationClick = (objNumber: number) => {
    const updatedUrl = data.next || data.previous || API_URL;
    paginationClick(updatedUrl.replace(/page=\d+/, `page=${objNumber}`));
  };
  function getSelectedObject(next: string | null, prev: string | null): number {
    if (next) {
      return +next.slice(-1) - 1;
    }

    if (prev) {
      return +prev.slice(-1) + 1;
    }

    return 1;
  }

  const onNextPrevClick = (urlKey: keyof IPaginationData): void => {
    if (!data[urlKey]) {
      return;
    }

    const url = data[urlKey] as string;
    paginationClick(url);
  };
  // render() {
  return (
    <div className="pagination">
      <button
        type="button"
        title="previous page"
        disabled={!data.previous}
        onClick={() => {
          onNextPrevClick('previous');
        }}
      >
        {'<'}
      </button>
      {paginationArray.map((number) => {
        return (
          <button
            key={number}
            className={number === selectedValue ? 'active' : ''}
            type="button"
            onClick={() => {
              onPaginationClick(number);
            }}
          >
            {number}
          </button>
        );
      })}
      <button
        type="button"
        title="next page"
        disabled={!data.next}
        onClick={() => {
          onNextPrevClick('next');
        }}
      >
        {'>'}
      </button>
    </div>
  );
  // }
}
