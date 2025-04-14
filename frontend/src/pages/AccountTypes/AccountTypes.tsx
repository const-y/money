import { AccountType, getAccountTypes } from '@/api/accountTypes';
import AppTable, { Column } from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_ACCOUNT_TYPE } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';
import ModalAddForm from './ModalAddForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const AccountTypes: FC = () => {
  const { data, isLoading } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);
  const { open } = useModalState(MODAL_ADD_ACCOUNT_TYPE);

  if (isLoading || !data) {
    return <Loader />;
  }

  const columns: Column<AccountType>[] = [
    {
      key: 'actions',
      title: '',
      renderCell: (row) => (
        <div>
          <ModalDelete id={row.id} title={row.title} />
          <ModalEdit initialValues={row} />
        </div>
      ),
      collapsing: true,
    },
    { key: 'title', title: 'Заголовок', renderCell: (row) => row.title },
  ];

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Типы счетов</PageTitle>
      {data?.length === 0 ? (
        <EmptyState
          title="Еще не создано ни одного типа счета"
          description="Типы счетов необходимы для создания счетов"
          actionLabel="Создать тип счета"
          onActionClick={open}
        />
      ) : (
        <AppTable columns={columns} data={data} />
      )}
    </>
  );
};

export default AccountTypes;
