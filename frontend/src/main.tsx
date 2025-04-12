import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

import Layout from './components/Layout';
import routes from './constants/routes';
import { ModalStateProvider } from './context/ModalState';
import Accounting from './pages/Accounting';
import Accounts from './pages/Accounts';
import AccountTypes from './pages/AccountTypes';
import Categories from './pages/Categories';
import ExchangeRates from './pages/ExchangeRates';
import ExpensesByCurrencies from './pages/ExpensesByCurrencies/ExpensesByCurrencies';
import ExpensesByCurrencyDetails from './pages/ExpensesByCurrencyDetails';
import Home from './pages/Home';
import IncomeExpenses from './pages/IncomeExpenses';
import Planning from './pages/Planning';

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
      { path: routes.INCOME_EXPENSES, element: <IncomeExpenses /> },
      {
        path: routes.EXPENSES_BY_CURRENCIES_REPORT,
        element: <Outlet />,
        children: [
          { path: '', element: <ExpensesByCurrencies /> },
          {
            path: ':currency/:year/:month',
            element: <ExpensesByCurrencyDetails />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalStateProvider>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </ModalStateProvider>
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
);
