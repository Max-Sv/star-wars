import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PaginationComponent } from '../components/pagination.component';
import { renderWithProviders } from './test-utils';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

const routes = [
  {
    path: '/',
    element: (
      <Provider store={setupStore()}>
        <PaginationComponent />
      </Provider>
    ),
  },
];
describe('PaginationComponent', async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/?page=1&per_page=20'],
    initialIndex: 0,
  });
  const memoryRouter = () => {
    render(<RouterProvider router={router} />);
  };

  test('options are correct in select', () => {
    renderWithProviders(<PaginationComponent />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('updates url state when select dropdown is changed', async () => {
    memoryRouter();
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: '20' } });
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=1&per_page=20');
      expect(select).toHaveValue('20');
    });
  });

  test('updates url state when next button is clicked', () => {
    memoryRouter();

    fireEvent.click(screen.getByTitle('next page'));
    waitFor(() => {
      expect(router.state.location.search).toBe('?page=2&per_page=20');
    });
  });

  test('updates url state when previous button is clicked', () => {
    memoryRouter();
    fireEvent.click(screen.getByTitle('previous page'));

    waitFor(() => {
      expect(router.state.location.search).toBe('?page=2&per_page=20');
    });
  });
});
