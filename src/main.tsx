import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ItemComponent } from './components/item.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: 'item/:itemId',
        element: <ItemComponent />,
      },
    ],
  },
  {
    path: 'about',
    element: <div>111About</div>,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
