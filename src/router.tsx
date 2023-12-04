import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ItemComponent, itemLoader } from './components/item.component';
import { ErrorBoundaryComponent } from './components/error-boundary.component';
import { NotFoundPage } from './components/not-found-page';
import { UncontrolledFormComponent } from './components/uncontrolled-form.component';
import { ControlledFormComponent } from './components/controlled-form.component';

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
    path: '/uncontrolled-form',
    element: <UncontrolledFormComponent />,
    ErrorBoundary: ErrorBoundaryComponent,
  },
  {
    path: '/controlled-form',
    element: <ControlledFormComponent />,
    ErrorBoundary: ErrorBoundaryComponent,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
