import api, { Entity } from './api';

export interface Account extends Entity {
  accountTypeId: string;
  currency: string;
  name: string;
  balance: number;
}

export interface CreateAccountData {
  name: string;
}

export const getAccounts = () =>
  api.get<Account[]>('/accounts/').then((result) => result.data);

export const getAccount = (accountId: number) =>
  api.get<Account>(`/accounts/${accountId}/`).then((result) => result.data);

export const createAccount = (data: CreateAccountData) =>
  api.post<Account>('/accounts/', data).then((result) => result.data);

export const deleteAccount = (id: number) =>
  api.delete<Account>(`/accounts/${id}/`).then((result) => result.data);

export const updateAccount = (data: Account) =>
  api.put<Account>(`/accounts/${data.id}/`, data).then((result) => result.data);
