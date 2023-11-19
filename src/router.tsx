import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ItemComponent, itemLoader } from './components/item.component';
import { ErrorBoundaryComponent } from './components/error-boundary.component';
import { NotFoundPage } from './components/not-found-page';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={setupStore()}>
        <App />
      </Provider>
    ),
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
