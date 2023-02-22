import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  useRouteError,
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom';

import './index.css';

import App from './App';

// Routing: see https://reactrouter.com/en/main/start/tutorial
// 404 page
function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

