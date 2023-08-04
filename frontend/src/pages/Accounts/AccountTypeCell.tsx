import { AccountType, getAccountTypes } from '@/api/accountTypes';
import queries from '@/constants/queries';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';

interface AccountTypeCellProps {
  accountTypeId: string;
}

const AccountTypeCell: FC<AccountTypeCellProps> = ({ accountTypeId }) => {
  const { data, isLoading } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);

  const accountTypesMap = useMemo(
    () =>
      data?.reduce<Record<string, AccountType>>((map, accountType) => {
        map[accountType.id] = accountType;
        return map;
      }, {}),
    [data]
  );

  if (isLoading) {
    return <Loader size="mini">Loading</Loader>;
  }

  return <>{accountTypesMap?.[accountTypeId]?.title || null}</>;
};

export default AccountTypeCell;
