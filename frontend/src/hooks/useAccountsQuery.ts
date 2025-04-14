import { getAccounts } from '@/api/accounts';
import queries from '@/constants/queries';
import { useQuery } from 'react-query';

const useAccountsQuery = () => useQuery(queries.ACCOUNTS, getAccounts);

export default useAccountsQuery;
