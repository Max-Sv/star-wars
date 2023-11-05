import React, { useEffect, useState } from 'react';
import './App.css';
import { HttpService } from './services/http.service';
import { ISearchState, SearchComponent } from './components/search.component';
import { ResultComponent } from './components/result.component';
import { PaginationComponent } from './components/pagination.component';
import { LocalStorageService } from './services/local-storage.service';
import { IState } from './models/models';
import { ErrorBoundaryComponent } from './components/error-boundary.component';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const initState = {
  results: null,
  count: 0,
  next: null,
  previous: null,
  currentPage: null,
  itemPerPage: null,
};

enum UrlType {
  init,
  search,
  common,
}
interface IPage {
  currentPage: number;
  itemPerPage: number;
  searchValue: null | string;
  type: UrlType;
}
export default function App() {
  const httpService = new HttpService();
  const localStorageService = new LocalStorageService();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [mainData, setMainData] = useState<IState>({ ...initState });
  const [url, setUrl] = useState<IPage>({
    currentPage: 1,
    itemPerPage: 20,
    searchValue: localStorageService.data,
    type: UrlType.init,
  });

  useEffect(() => {
    console.log('-> searchParams', searchParams);
    const { currentPage, itemPerPage, searchValue, type } = url;
    setMainData({ ...initState });
    const fetchData = async () => {
      if (type === UrlType.init && searchValue) {
        return await httpService.search(searchValue);
      }

      if (type === UrlType.search && searchValue) {
        localStorageService.setData(searchValue);
        return await httpService.search(searchValue);
      }
      return await httpService.getData({ currentPage, itemPerPage });
    };

    fetchData().then((response) => {
      setSearchParams(
        (type === UrlType.search || type === UrlType.init) && searchValue
          ? { search: searchValue }
          : { page: String(currentPage), per_page: String(itemPerPage) }
      );
      setMainData({ ...mainData, results: response });
    });
  }, [url]);

  const onQueryChange = async ({ value }: ISearchState) => {
    if (!value) {
      setUrl({ ...url, type: UrlType.common, searchValue: value, currentPage: 1 });
      return;
    }
    setUrl({ ...url, type: UrlType.search, searchValue: value });
  };

  const onPaginationClick = async (currentPage: number) => {
    setUrl({ ...url, type: UrlType.common, currentPage });
  };

  const onPerPageSelected = async (itemPerPage: number) => {
    setUrl({ ...url, type: UrlType.common, itemPerPage });
  };

  const navigateToLeftSectionOnly = () => {
    navigate({ pathname: `/`, search: location.search });
  };

  return (
    <ErrorBoundaryComponent>
      <section className="search-section">
        <SearchComponent
          initQuery={localStorageService.data}
          queryChanged={(e) => onQueryChange(e)}
        />
      </section>
      <section className="main-section">
        <div className="left-section">
          {location.pathname.includes('item') ? (
            <div className="wall-block" onClick={navigateToLeftSectionOnly}></div>
          ) : null}
          <div className="result-section">
            {mainData.results ? (
              mainData.results.length ? (
                mainData.results.map((data, index) => {
                  return (
                    <ResultComponent
                      key={index}
                      data={data}
                      search={location.search}
                    ></ResultComponent>
                  );
                })
              ) : (
                <span>No data 😞</span>
              )
            ) : (
              <span className="loader">loading...</span>
            )}
          </div>
          {mainData.results && !location.search.includes('search') ? (
            <PaginationComponent
              page={url.currentPage}
              itemPerPage={url.itemPerPage}
              paginationClick={onPaginationClick}
              perPageSelected={onPerPageSelected}
            ></PaginationComponent>
          ) : null}
        </div>
        <Outlet />
      </section>
    </ErrorBoundaryComponent>
  );
}
