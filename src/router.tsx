import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ItemComponent, itemLoader } from './components/item.component';
import { ErrorBoundaryComponent } from './components/error-boundary.component';
import { NotFoundPage } from './components/not-found-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    ErrorBoundary: ErrorBoundaryComponent,
    children: [
      {
        path: 'item/:itemId',
        element: <ItemComponent />,
        loader: itemLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
