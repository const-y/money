import { FC } from 'react';
import { useQuery } from 'react-query';
import { Header, Loader } from 'semantic-ui-react';

import { AccountType, getAccountTypes } from '@/api/accountTypes';
import AppTable, { Column } from '@/components/AppTable';
import queries from '@/constants/queries';
import ModalAddForm from './ModalAddForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const AccountTypes: FC = () => {
  const { data, isLoading } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);

  if (isLoading) {
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
      <Header as="h1">Типы счетов</Header>
      <ModalAddForm />
      {data && <AppTable columns={columns} data={data} />}
    </>
  );
};

export default AccountTypes;
