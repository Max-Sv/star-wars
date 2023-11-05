import { API_URL, API_URL_CONFIG } from '../config';
import { IResult } from '../models/models';

export class HttpService {
  async getData({
    currentPage,
    itemPerPage,
  }: {
    currentPage: number;
    itemPerPage: number;
  }): Promise<IResult[]> {
    const response = await fetch(
      `${API_URL}?page=${currentPage || 1}&per_page=${itemPerPage || 20}`,
      API_URL_CONFIG
    );
    return (await response.json()) as IResult[];
  }

  async search(query: string = ''): Promise<IResult[]> {
    console.log('-> query', query);
    const response = await fetch(`${API_URL}?beer_name=${query}`, API_URL_CONFIG);
    return (await response.json()) as IResult[];
  }

  async getItem(id: string = ''): Promise<IResult> {
    const response = await fetch(`${API_URL}${id}`, API_URL_CONFIG);
    const item = (await response.json()) as IResult[];
    return item[0];
  }
}
