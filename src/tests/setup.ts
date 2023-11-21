import { IResult } from '../models/models';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../config';
import { setupServer } from 'msw/node';

const items = (page = 1): IResult[] =>
  Array.from(Array(5).keys()).map(
    (idx) =>
      ({
        id: idx,
        name: `beer ${idx * page}`,
        tagline: `tagline ${idx}`,
        image_url: `image_url/${idx}`,
        description: `description ${idx}`,
        first_brewed: `first_brewed ${idx}`,
        abv: `abv ${idx}`,
        ibu: `ibu ${idx}`,
        ebc: `ebc ${idx}`,
        srm: `srm ${idx}`,
        ph: `ph ${idx}`,
        food_pairing: [`food_pairing ${idx}`],
      }) as unknown as IResult
  );

expect.extend(matchers);

const handlers = [
  http.get(`${API_URL}?page=1&per_page=20`, () => {
    return HttpResponse.json(items(1));
  }),

  http.get(`${API_URL}item/1?page=1&per_page=20`, () => {
    return HttpResponse.json(items(1)[0]);
  }),
];

export const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
