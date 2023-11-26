import '../app/globals.css';
import React from 'react';
import { SearchComponent } from '@/components/search.component';
import { CardListComponent } from '@/components/card-list.component';
import { PaginationComponent } from '@/components/pagination.component';
import {useRouter} from "next/dist/client/router";


export default function RootLayout({ children }: { children?: React.ReactNode }) {

  const router = useRouter();

  const navigateToLeftSectionOnly = () => {
    router.push({ pathname: `/`, search: location.search });
  };

  return (
    <>
      <section className="search-section">
        <SearchComponent />
      </section>
      <section className="main-section">
        <div className="left-section">
          {router.query?.id ? (
            <div
              className="wall-block"
              data-testid="wall"
              onClick={navigateToLeftSectionOnly}
            ></div>
          ) : null}
          <div className="result-section">
            <CardListComponent />
          </div>
           <PaginationComponent />
        </div>
        {children}
      </section>
    </>
  );
}
