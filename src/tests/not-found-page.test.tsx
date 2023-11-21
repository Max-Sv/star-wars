import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { NotFoundPage } from '../components/not-found-page';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('NotFoundPage', async () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  it('Renders NotFoundPage for invalid route', async () => {
    const routes = [
      {
        element: <App />,
        path: '/',
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/test'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Page is not found')).toBeInTheDocument();
    expect(screen.getByTestId('not-found')).toHaveTextContent('path: /test');
  });
});
