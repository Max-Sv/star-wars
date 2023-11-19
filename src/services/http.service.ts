import { API_URL, API_URL_CONFIG } from '../config';
import { IResult } from '../models/models';

class HttpService {
  async getItem(id: string = ''): Promise<IResult> {
    const response = await fetch(`${API_URL}${id}`, API_URL_CONFIG);
    const item = (await response.json()) as IResult[];

    return item[0];
  }
}

export default new HttpService();
