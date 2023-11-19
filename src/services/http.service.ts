import { API_URL, API_URL_CONFIG } from '../config';
import { IResult } from '../models/models';

class HttpService {
  async getData({
    currentPage,
    itemPerPage,
  }: {
    currentPage: number;
    itemPerPage: number;
  }): Promise<IResult[]> {
    const response = await fetch(
      `${API_URL}?page=${currentPage}&per_page=${itemPerPage}`,
      API_URL_CONFIG
    );
    return (await response.json()) as IResult[];
  }

  async search(query: string = ''): Promise<IResult[]> {
    const response = await fetch(`${API_URL}?beer_name=${query}`, API_URL_CONFIG);
    return (await response.json()) as IResult[];
  }

  async getItem(id: string = ''): Promise<IResult> {
    const response = await fetch(`${API_URL}${id}`, API_URL_CONFIG);
    const item = (await response.json()) as IResult[];

    return item[0];
  }
}

export default new HttpService();
