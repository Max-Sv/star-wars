import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('App', async () => {
  it('check loading state', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`/1?page=1&per_page=20`]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  it('check disabled left side of the page', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`/item/1?page=1&per_page=20`]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('wall')).toBeDefined();
  });

  it('check active left side of the page', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`/item/1?page=1&per_page=20`]}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('wall'));
    waitFor(() => {
      expect(screen.getAllByTestId('wall')).not.toBeDefined();
    });
  });
});
