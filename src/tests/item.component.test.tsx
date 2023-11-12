// item.component.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as routedDom from 'react-router-dom';
import { IResult } from '../models/models';
import { ItemComponent } from '../components/item.component';
// import { useNavigate } from 'react-router-dom';
// import httpService from '../services/http.service';

vi.mock('react-router-dom', async () => {
  return {
    useNavigation: vi.fn(),
    useNavigate: vi.fn(),
    useLoaderData: () => mockItem,
    useLocation: vi.fn(() => ({ pathname: '/mock-path' })),
  };
});

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useNavigation: vi.fn(),
//     useNavigate: vi.fn(),
//     useLoaderData: () => mockItem,
//     useLocation: vi.fn(() => ({ pathname: '/mock-path' })),
//   };
// });
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

// vi.mock('./item.component', async () => {
//   const actual = await vi.importActual('./item.component');
//   return {
//     ...actual,
//     useLoaderData: () => mockItem,
//   };
// });

describe('ItemComponent', async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('renders item details correctly', async () => {
    vi.spyOn(routedDom, 'useNavigation').mockImplementation(() => ({ state: 'submitting' }));

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

  it('handles loading state correctly', async () => {
    vi.spyOn(routedDom, 'useNavigation').mockImplementation(() => ({ state: 'loading' }));
    render(<ItemComponent />);
    await waitFor(() => screen.getByText('loading...'));

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  // it('calls navigate when Close button is clicked', async () => {
  //   vi.spyOn(routedDom, 'useNavigate').mockImplementation((test) => {
  //     console.log('-> test', test);
  //     return vi.fn(test);
  //   });
  //   vi.spyOn(routedDom, 'useNavigation').mockImplementation(() => ({ state: 'submitting' }));
  //
  //   render(<ItemComponent />);
  //   await waitFor(() => screen.getByText('Beer 1'));
  //
  //   // Simulate clicking the Close button
  //   const navigateMock = useNavigate();
  //   screen.getByText('Close').click();
  //
  //   // Verify that navigate is called with the correct arguments
  //   expect(navigateMock).toHaveBeenCalledWith({ pathname: '/', search: '' });
  // });

  // it('calls getItem when loader is executed', async () => {
  //   // vi.mock('react-router-dom', async () => {
  //   //   return {
  //   //     useNavigation: vi.fn(() => ({ state: 'loading' })), // Change the return value as needed
  //   //     useNavigate: vi.fn(),
  //   //     useLocation: vi.fn(() => ({ pathname: '/mock-path' })),
  //   //     useLoaderData: () => mockItem,
  //   //   };
  //   // });
  //   const { getItem } = httpService;
  //   const { itemLoader } = vi.mock['../components/item.component'];
  //
  //   await itemLoader({ params: { itemId: '1' } });
  //
  //   // Verify that getItem is called with the correct argument
  //   expect(getItem).toHaveBeenCalledWith('1');
  // });
});
