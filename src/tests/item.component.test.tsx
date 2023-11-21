import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as routedDom from 'react-router-dom';
import { IResult } from '../models/models';
import { ItemComponent } from '../components/item.component';
import { Navigation } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  return {
    useNavigation: vi.fn(),
    useNavigate: vi.fn(),
    useLoaderData: () => mockItem,
    useLocation: vi.fn(() => ({ pathname: '/mock-path' })),
  };
});

Object.defineProperty(global.window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

const mockItem: IResult = {
  id: 1,
  name: 'Beer 1',
  tagline: 'Tagline 1',
  abv: 5,
  ibu: 20,
  ebc: 10,
  srm: 15,
  ph: 4.5,
  first_brewed: '2022-01-01',
  description: 'Description for Beer 1',
  image_url: 'image_url/1',
  food_pairing: ['Food 1', 'Food 2'],
};

describe('ItemComponent', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('renders item details correctly', async () => {
    vi.spyOn(routedDom, 'useNavigation').mockImplementation(
      () => ({ state: 'submitting' }) as Navigation
    );

    render(<ItemComponent />);
    await waitFor(() => screen.getByText('Beer 1'));

    expect(screen.getByText('Beer 1')).toBeInTheDocument();
    expect(screen.getByText('Tagline: Tagline 1')).toBeInTheDocument();
    expect(screen.getByText('ABW: 5%')).toBeInTheDocument();
    expect(screen.getByText('IBU: 20')).toBeInTheDocument();
    expect(screen.getByText('EBC: 10')).toBeInTheDocument();
    expect(screen.getByText('SRM: 15')).toBeInTheDocument();
    expect(screen.getByText('Ph: 4.5')).toBeInTheDocument();
    expect(screen.getByText('First brewed: 2022-01-01')).toBeInTheDocument();
    expect(screen.getByText('Description for Beer 1')).toBeInTheDocument();
    expect(screen.getByText('Food 1')).toBeInTheDocument();
    expect(screen.getByText('Food 2')).toBeInTheDocument();
  });

  test('handles loading state correctly', async () => {
    vi.spyOn(routedDom, 'useNavigation').mockImplementation(
      () => ({ state: 'loading' }) as Navigation
    );
    render(<ItemComponent />);
    await waitFor(() => screen.getByText('loading...'));

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  test('calls navigate when Close button is clicked', async () => {
    const mockedNavigate = vi.fn();

    vi.spyOn(routedDom, 'useNavigate').mockImplementation(() => mockedNavigate);
    vi.spyOn(routedDom, 'useNavigation').mockImplementation(
      () => ({ state: 'submitting' }) as Navigation
    );

    render(<ItemComponent />);
    await waitFor(() => screen.getByText('Beer 1'));

    screen.getByText('Close').click();

    expect(mockedNavigate).toHaveBeenCalledWith({ pathname: '/', search: '' });
  });
});
