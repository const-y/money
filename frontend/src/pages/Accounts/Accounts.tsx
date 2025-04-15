import AppTable from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_ACCOUNT } from '@/constants/modalIds';
import { useModalState } from '@/context/ModalState';
import useAccountsQuery from '@/hooks/useAccountsQuery';
import { FC } from 'react';
import { Loader } from 'semantic-ui-react';
import ModalAddForm from './ModalAddForm';
import accountsColumns from './accountsColumns';

const Accounts: FC = () => {
  const { data, isLoading } = useAccountsQuery();
  const { open } = useModalState(MODAL_ADD_ACCOUNT);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Счета</PageTitle>
      <AppTable
        columns={accountsColumns}
        data={data}
        renderEmptyState={() => (
          <EmptyState
            title="Еще не создано ни одного счета"
            description="Счета необходимы для создания транзакций"
            actionLabel="Добавить счет"
            onActionClick={open}
          />
        )}
      />
    </>
  );
};

export default Accounts;
