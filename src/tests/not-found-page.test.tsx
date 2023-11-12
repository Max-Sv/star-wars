import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../components/not-found-page';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { router } from '../router';

describe('NotFoundPage', async () => {
  it('renders NotFoundPage for invalid route', async () => {
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        useRoutes: () => router, // Provide your router here
      };
    });

    // Render your app with the BrowserRouter and navigate to an invalid route
    render(
      <MemoryRouter initialEntries={['/test']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Page is not found')).toBeInTheDocument();
  });
});
