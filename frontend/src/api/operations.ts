import api from './api';

export interface Operation {
  category: number;
  date: string;
  description: string;
  id: number;
  amount: number;
}

export interface GetOperationListRequestParams {
  account: number;
}

export interface CreateOperationRequestParams {
  account: number;
  amount: number;
  date: string;
  description: string;
  category: number;
  counterparty: number;
}

export const getOperationList = ({ account }: GetOperationListRequestParams) =>
  api
    .get<Operation[]>(`/accounts/${account}/operations/`)
    .then((result) => result.data);

export const createOperation = ({
  account,
  ...params
}: CreateOperationRequestParams) =>
  api
    .post<Operation>(`/accounts/${account}/operations/`, params)
    .then((result) => result.data);
