import React from 'react';
import './App.css';
import { SearchComponent } from './components/search.component';
import { PaginationComponent } from './components/pagination.component';
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CardListComponent } from './components/card-list.component';
import { DataProvider } from './context/data.context';

export default function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const navigateToLeftSectionOnly = () => {
    navigate({ pathname: `/`, search: location.search });
  };

  return (
    <>
      <DataProvider>
        <section className="search-section">
          <SearchComponent />
        </section>
        <section className="main-section">
          <div className="left-section">
            <div id="wall-block" className="wall-block" onClick={navigateToLeftSectionOnly}></div>
            <div className="result-section">
              <CardListComponent />
            </div>
            {!searchParams?.get('search') ? <PaginationComponent /> : null}
          </div>
          <Outlet />
        </section>
      </DataProvider>
    </>
  );
}
