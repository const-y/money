import api from './api';

interface Operation {
  account: number;
  amount: number;
}

export interface Transaction {
  id?: number;
  operations?: Operation[];
  description: string;
  date: string;
  category?: number;
  counterparty?: number;
}

export const createTransaction = (data: Transaction) =>
  api.post<Transaction>(`/transactions/`, data).then((result) => result.data);
