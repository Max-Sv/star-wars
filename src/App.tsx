import { useEffect, useState } from 'react';
import './App.css';
import { HttpService } from './services/http.service';
import { ISearchState, SearchComponent } from './components/search.component';
import { ResultComponent } from './components/result.component';
import { PaginationComponent } from './components/pagination.component';
import { PAGE_OBJECT_NUMBER } from './config';
import { LocalStorageService } from './services/local-storage.service';
import { IState } from './models/models';
import { ErrorBoundaryComponent } from './components/error-boundary.component';

const initState = {
  results: null,
  count: 0,
  next: null,
  previous: null,
};
export default function App() {
  const httpService = new HttpService();
  const localStorageService = new LocalStorageService();
  // constructor(
  //   props: IProps,
  //   private httpService: HttpService,
  //   private localStorageService: LocalStorageService
  // ) {
  //   super(props);
  //   this.httpService = new HttpService();
  //   this.localStorageService = new LocalStorageService();
  //   this.state = { ...initState };
  //   this.onPaginationClick = this.onPaginationClick.bind(this);
  // }
  const [mainData, setMainData] = useState<IState>({ ...initState });

  useEffect(() => {
    // async function updateStateValue1(callback: (url?: string) => Promise<IState>, value?: string) {
    //   setMainData({ ...initState });
    //   const res = await callback(value);
    //   setMainData({ ...res });
    // }
    if (localStorageService.data) {
      // updateStateValue(httpService.search, localStorageService.data).();
      httpService.search(localStorageService.data).then((res) => {
        setMainData({ ...res });
      });
      return;
    }
    // updateStateValue1(httpService.getData).catch(console.log);
    httpService.getData().then((res) => {
      setMainData({ ...res });
    });
  });

  const updateStateValue = async (callback: (url?: string) => Promise<IState>, value?: string) => {
    setMainData({ ...initState });
    const res = await callback(value);
    setMainData({ ...res });
  };
  const onQueryChange = async ({ value }: ISearchState) => {
    if (!value) {
      await updateStateValue(httpService.getData);
      return;
    }
    localStorageService.setData(value);
  };
  const onPaginationClick = async (url: string) => {
    await updateStateValue(httpService.getData, url);
  };

  return (
    <ErrorBoundaryComponent>
      <section className="search-section">
        <SearchComponent initQuery={localStorageService.data} queryChanged={onQueryChange} />
      </section>
      <section className="result-section">
        {mainData.results ? (
          mainData.results.length ? (
            mainData.results.map((data, index) => {
              return <ResultComponent key={index} data={data}></ResultComponent>;
            })
          ) : (
            <span>No data 😞</span>
          )
        ) : (
          <span>loading...</span>
        )}
      </section>
      {mainData.results && mainData.count > PAGE_OBJECT_NUMBER ? (
        <PaginationComponent
          data={mainData}
          paginationClick={onPaginationClick}
        ></PaginationComponent>
      ) : null}
    </ErrorBoundaryComponent>
  );
}
