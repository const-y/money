import { getOperationList } from '@/api/operations';
import queries from '@/constants/queries';
import { useQuery } from 'react-query';

const useOperationsQuery = (accountId: number) =>
  useQuery([queries.ACCOUNTS, accountId, queries.OPERATIONS], () =>
    getOperationList({ account: accountId })
  );

export default useOperationsQuery;
