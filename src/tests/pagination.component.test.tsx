import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationComponent } from '../components/pagination.component';
import { renderWithProviders } from './test-utils';

describe('PaginationComponent', async () => {
  test('options are correct in select', () => {
    renderWithProviders(<PaginationComponent />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('updates url state when select dropdown is changed', () => {
    render(<PaginationComponent />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } });
  });

  test('updates url state when next button is clicked', () => {
    render(<PaginationComponent />);

    fireEvent.click(screen.getByTitle('next page'));
  });

  test('updates url state when previous button is clicked', () => {
    render(<PaginationComponent />);

    fireEvent.click(screen.getByTitle('previous page'));
  });
});
