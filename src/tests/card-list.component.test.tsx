import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CardListComponent } from '../components/card-list.component';
import { DataContext } from '../context/data.context';
import { IResult } from '../models/models';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual: NonNullable<unknown> = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      search: 'exampleSearch',
    }),
  };
});

describe('CardListComponent', async () => {
  it('renders cards correctly', () => {
    const mockCards = [
      {
        id: 1,
        name: 'Beer 1',
        tagline: 'Tagline 1',
        abv: 5,
        ibu: 20,
        ebc: 10,
        srm: 15,
        ph: 4.5,
      },
      {
        id: 2,
        name: 'Beer 2',
        tagline: 'Tagline 2',
        abv: 6,
        ibu: 25,
        ebc: 12,
        srm: 18,
        ph: 4.8,
      },
    ] as IResult[];

    render(
      <MemoryRouter>
        <DataContext.Provider value={{ cards: mockCards } as unknown as DataContext}>
          <CardListComponent />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Beer 1')).toBeInTheDocument();
    expect(screen.getByText('Tagline: Tagline 1')).toBeInTheDocument();
    expect(screen.getByText('ABW: 5%')).toBeInTheDocument();
    expect(screen.getByText('IBU: 20')).toBeInTheDocument();
    expect(screen.getByText('EBC: 10')).toBeInTheDocument();
    expect(screen.getByText('SRM: 15')).toBeInTheDocument();
    expect(screen.getByText('Ph: 4.5')).toBeInTheDocument();

    expect(screen.getByText('Beer 2')).toBeInTheDocument();
    expect(screen.getByText('Tagline: Tagline 2')).toBeInTheDocument();
    expect(screen.getByText('ABW: 6%')).toBeInTheDocument();
    expect(screen.getByText('IBU: 25')).toBeInTheDocument();
    expect(screen.getByText('EBC: 12')).toBeInTheDocument();
    expect(screen.getByText('SRM: 18')).toBeInTheDocument();
    expect(screen.getByText('Ph: 4.8')).toBeInTheDocument();
  });

  it('renders "No data" when cards array is empty', () => {
    render(
      <MemoryRouter>
        <DataContext.Provider value={{ cards: [] } as unknown as DataContext}>
          <CardListComponent />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('No data 😞')).toBeInTheDocument();
  });

  it('renders "loading..." when cards array is undefined', () => {
    render(
      <MemoryRouter>
        <DataContext.Provider value={{ cards: undefined } as unknown as DataContext}>
          <CardListComponent />
        </DataContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });
});
