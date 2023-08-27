import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

import Layout from './components/Layout';
import Accounting from './pages/Accounting';
import AccountTypes from './pages/AccountTypes';
import Home from './pages/Home';
import Planning from './pages/Planning';
import routes from './constants/routes';
import Accounts from './pages/Accounts';
import ExchangeRates from './pages/ExchangeRates';
import Categories from './pages/Categories';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'accounting', element: <Accounting /> },
      { path: 'planning', element: <Planning /> },
      { path: 'account-types', element: <AccountTypes /> },
      { path: routes.ACCOUNTS, element: <Accounts /> },
      { path: routes.EXCHANGE_RATES, element: <ExchangeRates /> },
      { path: routes.CATEGORIES, element: <Categories /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
);
