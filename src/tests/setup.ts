import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import '@testing-library/jest-dom/vitest';
import { IResult } from '../models/models';
import { setupStore } from '../store/store';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { apiCard } from '../store/slices/card-api.slice';

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

const store = setupStore({});
export const handlers = [
  rest.get('https://api.punkapi.com/v2/beers', (req, res, ctx) => {
    // successful response
    return res(ctx.status(200), ctx.json(items(1)), ctx.delay(30));
  }),
];

export const server = setupServer(...handlers);
// Establish API mocking before all tests.
beforeAll(() => {
  server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  // This is the solution to clear RTK Query cache after each test
  store.dispatch(apiCard.util.resetApiState());
});

// Clean up after the tests are finished.
afterAll(() => server.close());
