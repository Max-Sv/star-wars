import { STORAGE_KEY } from '../config';

export class LocalStorageService {
  readonly data: string | null = null;
  constructor() {
    this.data = this.getData();
  }

  setData(data: string): void {
    localStorage.setItem(STORAGE_KEY, data);
  }

  getData(): string | null {
    return localStorage.getItem(STORAGE_KEY);
  }
}
