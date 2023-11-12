import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { UrlType } from '../context/data.context';
import { PaginationComponent } from '../components/pagination.component';

vi.mock('../context/data.context', async () => {
  const actual: NonNullable<unknown> = await vi.importActual('../context/data.context');
  return {
    ...actual,
    useDataContext: () => ({
      url: {
        type: UrlType.common,
        itemPerPage: 10,
        currentPage: 1,
      },
      setUrl: mockSetUrl,
    }),
  };
});
const mockSetUrl = vi.fn();

describe('PaginationComponent', async () => {
  test('options are correct in select', () => {
    render(<PaginationComponent />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('updates url state when select dropdown is changed', () => {
    render(<PaginationComponent />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } });

    expect(mockSetUrl).toHaveBeenCalledWith({
      type: UrlType.common,
      itemPerPage: 20,
      currentPage: 1,
    });
  });

  it('updates url state when next button is clicked', () => {
    render(<PaginationComponent />);

    fireEvent.click(screen.getByTitle('next page'));

    expect(mockSetUrl).toHaveBeenCalledWith({
      type: UrlType.common,
      itemPerPage: 10,
      currentPage: 2,
    });
  });

  test('updates url state when previous button is clicked', () => {
    render(<PaginationComponent />);

    fireEvent.click(screen.getByTitle('previous page'));

    expect(mockSetUrl).toHaveBeenCalledWith({
      type: UrlType.common,
      itemPerPage: 20,
      currentPage: 1,
    });
  });
});
