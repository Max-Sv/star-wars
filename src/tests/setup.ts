import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { IResult } from '../models/models';

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

vi.mock('../services/http.service.ts', () => {
  return {
    __esModule: true,
    default: {
      async getData({
        currentPage,
        itemPerPage,
      }: {
        currentPage: number;
        itemPerPage: number;
      }): Promise<IResult[]> {
        // const page = currentPage || 1;
        console.log('-> itemPerPage', itemPerPage);
        console.log('-> currentPage', currentPage);

        return items(1);
      },
      async search(query: string): Promise<IResult> {
        console.log('-> query', query);
        return items(1)[3];
      },
      async getItem(id: number): Promise<IResult | undefined> {
        console.log('!!!-> id', id);
        return items(1).find((item) => item.id === id);
      },
    },
  };
});

afterEach(() => {
  cleanup();
});
