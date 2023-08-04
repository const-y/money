import api from './api';

export interface Operation {
  categoryId: number;
  date: string;
  description: string;
  id: number;
  amount: number;
}

export interface GetOperationListRequestParams {
  accountId: number;
}

export interface CreateOperationRequestParams {
  accountId: number;
  amount: number;
  date: string;
  description: string;
  categoryId: number;
  counterpartyId: number;
}

export const getOperationList = ({
  accountId,
}: GetOperationListRequestParams) =>
  api
    .get<Operation[]>(`/accounts/${accountId}/operations/`)
    .then((result) => result.data);

export const createOperation = ({
  accountId,
  ...params
}: CreateOperationRequestParams) =>
  api
    .post<Operation>(`/accounts/${accountId}/operations/`, params)
    .then((result) => result.data);
