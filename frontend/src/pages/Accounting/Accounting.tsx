import { EmptyState, PageTitle } from '@/components/ui';
import routes from '@/constants/routes';
import useAccountsQuery from '@/hooks/useAccountsQuery';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActiveAccountProvider } from './ActiveAccountContext';
import AccountingGrid from './components/AccountingGrid';

const Accounting: FC = () => {
  const { data: accounts } = useAccountsQuery();
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>Учет</PageTitle>
      {accounts?.length === 0 ? (
        <EmptyState
          title="Нет счетов"
          description="Для осуществления учета необходимо создать хотя бы один счет."
          actionLabel="Перейти к созданию счетов"
          onActionClick={() => {
            navigate(`/${routes.ACCOUNTS}`);
          }}
        />
      ) : (
        <ActiveAccountProvider>
          <AccountingGrid />
        </ActiveAccountProvider>
      )}
    </>
  );
};

export default Accounting;
