import api from './api';

export interface Period {
  from: string;
  to: string;
}

export interface IncomeExpensesReportData {
  income: number;
  expenses: number;
}

export interface ExpensesByCurrenciesReportDataItem {
  currency: string;
  month: number;
  totalAmount: number;
}

export interface GetExpensesBuCurrenciesDetailsReportArg {
  currency: string;
  year: number;
  month: number;
}

export interface ExpensesBuCurrenciesDetailsReportItem {
  id: number;
  name: string;
  totalAmount: number;
}

export const getIncomeExpensesReport = (params: Period) =>
  api
    .get<IncomeExpensesReportData>('/reports/income-expenses', { params })
    .then((result) => result.data);

export const getExpensesBuCurrenciesReport = (year: number) =>
  api
    .get<ExpensesByCurrenciesReportDataItem[]>(
      '/reports/expenses-by-currencies',
      {
        params: { year },
      }
    )
    .then((result) => result.data);

export const getExpensesBuCurrenciesDetailsReport = ({
  currency,
  year,
  month,
}: GetExpensesBuCurrenciesDetailsReportArg) =>
  api
    .get<ExpensesBuCurrenciesDetailsReportItem[]>(
      `/reports/expenses-by-currencies/${currency}/${year}/${month}`
    )
    .then((result) => result.data);
