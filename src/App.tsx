import React, { useEffect } from 'react';
import './App.css';
import { SearchComponent } from './components/search.component';
import { PaginationComponent } from './components/pagination.component';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CardListComponent } from './components/card-list.component';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useFetchCardsQuery } from './store/slices/card-api.slice';
import { setUrl } from './store/slices/card.slice';

export default function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const url = useAppSelector(({ cards }) => cards.url);
  useFetchCardsQuery({ currentPage: url?.currentPage, itemPerPage: url?.itemPerPage });

  const searchValue = useAppSelector(({ cards }) => cards.searchValue);

  const navigateToLeftSectionOnly = () => {
    navigate({ pathname: `/`, search: location.search });
  };

  useEffect(() => {
    if (!searchValue) {
      dispatch(
        setUrl({
          currentPage: 1,
          itemPerPage: 20,
        })
      );
      setSearchParams({ page: String(url?.currentPage), per_page: String(url?.itemPerPage) });
      return;
    }

    setSearchParams({ search: searchValue });
  }, [searchValue]);

  useEffect(() => {
    if (!url) {
      return;
    }

    setSearchParams({ page: String(url.currentPage), per_page: String(url.itemPerPage) });
  }, [url]);

  return (
    <>
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
    </>
  );
}
