import { screen, fireEvent } from '@testing-library/react';
import { SearchComponent } from '../components/search.component';
import { renderWithProviders } from './test-utils';

describe('SearchComponent', async () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('check component elements', () => {
    renderWithProviders(<SearchComponent />);

    expect(screen.getByLabelText("Let's try to find a BEER:")).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('check initial input value from local store', () => {
    renderWithProviders(<SearchComponent />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('check input value', () => {
    renderWithProviders(<SearchComponent />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'IPA' } });

    expect(screen.getByRole('textbox')).toHaveValue('IPA');
  });

  it('verify that clicking the button saves the value to the local store', () => {
    renderWithProviders(<SearchComponent />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'IPA' } });
    fireEvent.click(button);
    expect(localStorage.getItem('searchQuery')).toBe('IPA');
  });
});
