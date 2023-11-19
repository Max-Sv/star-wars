import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ItemComponent, itemLoader } from './components/item.component';
import { ErrorBoundaryComponent } from './components/error-boundary.component';
import { NotFoundPage } from './components/not-found-page';
import { Provider } from 'react-redux';
import { store } from './store/search-value.slice';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
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
