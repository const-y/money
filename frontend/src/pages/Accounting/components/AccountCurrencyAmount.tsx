import { getAccount } from '@/api/accounts';
import formatCurrency from '@/helpers/formatCurrency';
import getAccountQueryKey from '@/helpers/getAccoutQueryKey';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';

interface AccountCurrencyAmountProps {
  accountId: number;
  children: number;
}

export const AccountCurrencyAmount: FC<AccountCurrencyAmountProps> = ({
  children,
  accountId,
}) => {
  const { data: account, isLoading: isAccountLoading } = useQuery(
    getAccountQueryKey(accountId),
    () => getAccount(accountId)
  );

  if (!account || isAccountLoading) {
    return <Loader active inline />;
  }

  return <span>{formatCurrency(children, account.currency)}</span>;
};

export default AccountCurrencyAmount;
