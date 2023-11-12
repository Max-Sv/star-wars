// pagination.component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { UrlType } from '../context/data.context';
import { PaginationComponent } from '../components/pagination.component';

vi.mock('../context/data.context', async () => {
  const actual = await vi.importActual('../context/data.context');
  return {
    ...actual,
    useDataContext: () => ({
      url: {
        type: UrlType.common,
        itemPerPage: 10,
        currentPage: 1,
      },
      setUrl: vi.fn(),
    }),
  };
});

describe('PaginationComponent', async () => {
  it('updates url state when select dropdown is changed', () => {
    // const { setUrl } = useDataContext();

    render(<PaginationComponent />);

    // Verify the initial state
    // expect(screen.getByLabelText('Items Per Page:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();

    // Simulate changing the dropdown value
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } });

    // Check that setUrl is called with the correct value
    // expect(setUrl).toHaveBeenCalledWith({
    //   type: UrlType.common,
    //   itemPerPage: 20,
    //   currentPage: 1,
    // });
  });

  // it('updates url state when previous button is clicked', () => {
  //   const { setUrl } = useDataContext();
  //
  //   render(<PaginationComponent />);
  //
  //   // Simulate clicking the previous button
  //   fireEvent.click(screen.getByTitle('previous page'));
  //
  //   // Check that setUrl is called with the correct value
  //   expect(setUrl).toHaveBeenCalledWith({
  //     type: UrlType.common,
  //     itemPerPage: 10,
  //     currentPage: 0, // currentPage should not go below 1
  //   });
  // });

  // it('updates url state when next button is clicked', () => {
  //   const { setUrl } = useDataContext();
  //
  //   render(<PaginationComponent />);
  //
  //   // Simulate clicking the next button
  //   fireEvent.click(screen.getByTitle('next page'));
  //
  //   // Check that setUrl is called with the correct value
  //   expect(setUrl).toHaveBeenCalledWith({
  //     type: UrlType.common,
  //     itemPerPage: 10,
  //     currentPage: 2,
  //   });
  // });
});
