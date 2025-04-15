import { getAccountTypes } from '@/api/accountTypes';
import AppTable from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_ACCOUNT_TYPE } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';
import ModalAddForm from './ModalAddForm';
import accountTypesColumns from './accountTypesColums';

const AccountTypes: FC = () => {
  const { data, isLoading } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);
  const { open } = useModalState(MODAL_ADD_ACCOUNT_TYPE);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Типы счетов</PageTitle>
      <AppTable
        columns={accountTypesColumns}
        data={data}
        renderEmptyState={() => (
          <EmptyState
            title="Еще не создано ни одного типа счета"
            description="Типы счетов необходимы для создания счетов"
            actionLabel="Создать тип счета"
            onActionClick={open}
          />
        )}
      />
    </>
  );
};

export default AccountTypes;
