import React, { useEffect } from 'react';
import './App.css';
import { SearchComponent } from './components/search.component';
import { PaginationComponent } from './components/pagination.component';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CardListComponent } from './components/card-list.component';
// import { DataProvider } from './context/data.context';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { searchCards, setUrl, UrlType, useFetchCardsQuery } from './store/search-value.slice';
// import httpService from './services/http.service';
// import { UrlType } from './context/data.context';

export default function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const url = useAppSelector(({ cards }) => cards.url);
  console.log('-> url', url);
  const searchValue = useAppSelector(({ cards }) => cards.searchValue);
  // useCardListQuery({ currentPage: 1, itemPerPage: 20 });
  const currentPage = searchParams?.get('page') || 1;
  const itemPerPage = searchParams?.get('per_page') || 20;
  // const { data = [], isLoading } = useFetchCardsQuery({ currentPage, itemPerPage });
  const navigateToLeftSectionOnly = () => {
    navigate({ pathname: `/`, search: location.search });
  };

  // useEffect(() => {
  //   if (!searchValue) {
  //     dispatch(
  //       setUrl({
  //         currentPage: 1,
  //         itemPerPage: 20,
  //         type: UrlType.common,
  //       })
  //     );
  //     return;
  //   }
  //   dispatch(searchCards());
  //   // dispatch(fetchCards());
  //   // setSearchParams({ page: String(currentPage), per_page: String(itemPerPage) });
  //   setSearchParams({ search: searchValue });
  // }, [searchValue]);

  // useEffect(() => {
  //   const currentPage = searchParams?.get('page') || 1;
  //   const itemPerPage = searchParams?.get('per_page') || 20;
  //
  //   dispatch(
  //     setUrl({
  //       currentPage: Number(currentPage),
  //       itemPerPage: Number(itemPerPage),
  //       type: UrlType.init,
  //     })
  //   );
  //   // useFetchCardsQuery({ currentPage, itemPerPage });
  //
  //   // useCardListQuery({ currentPage: 1, itemPerPage: 20 });
  // }, []);
  //
  // useEffect(() => {
  //   // if (!url) {
  //   //   return;
  //   // }
  //   // // const searchValue = searchParams?.get('search') || '';
  //   // // console.log('-> 55searchValue', searchValue);
  //   // // if (searchValue) {
  //   // //   return;
  //   // // }
  //   // const { currentPage, itemPerPage } = url;
  //   // dispatch(fetchCards());
  //   // setSearchParams({ page: String(currentPage), per_page: String(itemPerPage) });
  // }, [url]);

  return (
    <>
      {/*<DataProvider>*/}
      <section className="search-section">
        <SearchComponent />
      </section>
      <section className="main-section">
        <div className="left-section">
          {location.pathname.includes('item') ? (
            <div className="wall-block" onClick={navigateToLeftSectionOnly}></div>
          ) : null}
          <div className="result-section">
            <CardListComponent />
          </div>
          {!searchParams?.get('search') ? <PaginationComponent /> : null}
        </div>
        <Outlet />
      </section>
      {/*</DataProvider>*/}
    </>
  );
}
