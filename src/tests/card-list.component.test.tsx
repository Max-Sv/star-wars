import { screen } from '@testing-library/react';
import { CardListComponent } from '../components/card-list.component';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from './test-utils';
import { server } from './setup';

describe('CardListComponent', async () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders "No data" when cards array is empty', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={[`/?page=1&per_page=20`]}>
        <CardListComponent />
      </MemoryRouter>
    );

    expect(screen.getByText('No data 😞')).toBeInTheDocument();
  });
});
