import api, { Entity } from './api';

export interface AccountType extends Entity {
  title: string;
}

export interface CreateAccountTypeData {
  title: string;
}

export const getAccountTypes = () =>
  api.get<AccountType[]>('/account-types/').then((result) => result.data);

export const createAccountType = (data: CreateAccountTypeData) =>
  api.post<AccountType>('/account-types/', data).then((result) => result.data);

export const deleteAccountType = (id: number) =>
  api
    .delete<AccountType>(`/account-types/${id}/`)
    .then((result) => result.data);

export const updateAccountType = (data: AccountType) =>
  api
    .put<AccountType>(`/account-types/${data.id}/`, data)
    .then((result) => result.data);
