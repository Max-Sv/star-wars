import { IState } from '../App';

export const API_URL = 'https://swapi.dev/api/people/';
export class HttpService {
  constructor() {
    // this.getData = this.getData.bind(this);
  }
  async getData(url = API_URL) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) as IState;
  }

  async search(query: string = '') {
    if (!query) {
      return;
    }
    const response = await fetch(`${API_URL}?search=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()) as IState;
  }
}
