import { API_URL, API_URL_CONFIG } from '../config';
import { IState } from '../models/models';

export class HttpService {
  async getData(url: string = API_URL): Promise<IState> {
    const response = await fetch(url, API_URL_CONFIG);
    return (await response.json()) as IState;
  }

  async search(query: string = ''): Promise<IState> {
    const response = await fetch(`${API_URL}?search=${query}`, API_URL_CONFIG);
    return (await response.json()) as IState;
  }
}
