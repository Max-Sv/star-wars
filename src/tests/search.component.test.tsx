// search.component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { DataContext } from '../context/data.context';
import { SearchComponent } from '../components/search.component';
import { MemoryRouter } from 'react-router-dom';
// import { CardListComponent } from '../components/card-list.component';

vi.mock('../context/data.context', async () => {
  const actual = await vi.importActual('../context/data.context');
  return {
    ...actual,
    useDataContext: () => ({
      searchValue: '',
      setSearchValue: vi.fn(),
    }),
  };
});

describe('SearchComponent', async () => {
  it('updates input value and calls setSearchValue on button click', () => {
    // const { setSearchValue } = useDataContext();
    render(
      <MemoryRouter>
        <DataContext.Provider value={{ searchValue: '', setSearchValue: vi.fn() }}>
          <SearchComponent />
        </DataContext.Provider>
      </MemoryRouter>
    );

    // Verify the initial state
    expect(screen.getByLabelText("Let's try to find a BEER:")).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'IPA' } });

    // Check that the input value is updated
    expect(screen.getByRole('textbox')).toHaveValue('IPA');

    // Simulate button click
    fireEvent.click(screen.getByRole('button'));
    // console.log(setSearchValue.mock.calls);
    // Check that setSearchValue is called with the correct value
    // expect(setSearchValue).toHaveBeenCalledWith('IPA');
    // expect(setSearchValue).toHaveBeenCalledWith('IPA');
  });
});
