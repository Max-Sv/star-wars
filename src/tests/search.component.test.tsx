import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DataContext } from '../context/data.context';
import { SearchComponent } from '../components/search.component';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../context/data.context', async () => {
  const actual: NonNullable<unknown> = await vi.importActual('../context/data.context');
  return {
    ...actual,
    useDataContext: () => ({
      searchValue: '',
      setSearchValue: vi.fn(),
    }),
  };
});

describe('SearchComponent', async () => {
  it('check component elements', () => {
    render(
      <MemoryRouter>
        <DataContext.Provider
          value={{ searchValue: '', setSearchValue: vi.fn() } as unknown as DataContext}
        >
          <SearchComponent />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Let's try to find a BEER:")).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('check input value', () => {
    render(
      <MemoryRouter>
        <DataContext.Provider
          value={{ searchValue: '', setSearchValue: vi.fn() } as unknown as DataContext}
        >
          <SearchComponent />
        </DataContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'IPA' } });

    expect(screen.getByRole('textbox')).toHaveValue('IPA');
  });
});
