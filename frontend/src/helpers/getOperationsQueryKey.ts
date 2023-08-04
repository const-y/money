import queries from '@/constants/queries';

export default function getOperationsQueryKey(accountId: number) {
  return queries.OPERATIONS + accountId;
}
