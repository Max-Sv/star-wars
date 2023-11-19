import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { ErrorBoundaryComponent } from '../components/error-boundary.component';

describe('Error Boundary', () => {
  it(`should render error boundary component when there is an error`, () => {
    const renderProviders = (ui: React.ReactElement) => render(ui, {});
    const ThrowError = () => {
      throw new Error('Error');
    };
    const { getByText } = renderProviders(
      <ErrorBoundaryComponent>
        <ThrowError />
      </ErrorBoundaryComponent>
    );

    vi.spyOn(console, 'error').mockImplementation(() => null);
    expect(() => render(<ThrowError />)).toThrow();

    const errorMessage = getByText(/Something went wrong/i);
    expect(errorMessage).toBeDefined();
  });
});
