import { IResult } from '../models/models';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LocalStorageService } from '../services/local-storage.service';
import httpService from "../services/http.service";
// import { HttpService } from '../services/http.service';
export enum UrlType {
  init,
  search,
  common,
}
export interface IUrl {
  currentPage: number;
  itemPerPage: number;
  type: UrlType;
}
interface DataContext {
  cards: IResult[] | null;
  searchValue: null | string;
  url: IUrl;
  setSearchValue: (v: string) => void;
  setCards: (v: IResult[] | null) => void;
  setUrl: (v: IUrl) => void;
}

export const DataContext = createContext<DataContext>({
  cards: null,
  searchValue: null,
  url: {
    currentPage: 1,
    itemPerPage: 20,
    type: UrlType.init,
  },
  setSearchValue: () => {},
  setCards: () => {},
  setUrl: () => {},
});

export const DataProvider = (props: PropsWithChildren<object>) => {
  const localStorageService = new LocalStorageService();
  // const httpService = new HttpService();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cards, setCards] = useState<IResult[] | null>(null);
  const [searchValue, setSearchValue] = useState(localStorageService.data);
  const [url, setUrl] = useState<IUrl>({
    currentPage: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    itemPerPage: searchParams.get('per_page') ? Number(searchParams.get('per_page')) : 20,
    type: UrlType.init,
  });

  useEffect(() => {
    const { currentPage, itemPerPage, type } = url;

    setCards(null);
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
      setCards(response);
    });
  }, [url]);

  useEffect(() => {

    if (!searchValue) {
      setUrl({ ...url, type: UrlType.common, currentPage: 1 });
      return;
    }
    setUrl({ ...url, type: UrlType.search });
  }, [searchValue]);

  return (
    <DataContext.Provider
      value={{
        cards,
        setCards,
        searchValue,
        setSearchValue,
        url,
        setUrl,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
export const useDataContext = () => useContext(DataContext);
