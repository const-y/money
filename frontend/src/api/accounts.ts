import Account from '@/models/Account';
import api from './api';
import { CreateAccount } from '@/models/CreateAccount';

export const getAccounts = () =>
  api.get<Account[]>('/accounts/').then((result) => result.data);

export const getAccount = (accountId: number) =>
  api.get<Account>(`/accounts/${accountId}/`).then((result) => result.data);

export const createAccount = (data: CreateAccount) =>
  api.post<Account>('/accounts/', data).then((result) => result.data);

export const deleteAccount = (id: number) =>
  api.delete<Account>(`/accounts/${id}/`).then((result) => result.data);

export const updateAccount = (data: Account) =>
  api.put<Account>(`/accounts/${data.id}/`, data).then((result) => result.data);
