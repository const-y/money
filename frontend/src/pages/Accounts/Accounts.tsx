import { FC } from 'react';
import { useQuery } from 'react-query';
import { Header, Loader } from 'semantic-ui-react';

import { Account, getAccounts } from '@/api/accounts';
import AppTable, { Column } from '@/components/AppTable';
import queries from '@/constants/queries';

import ModalAddForm from './ModalAddForm';
import ModalDeleteAccount from './ModalDeleteAccount';
import ModalEdit from './ModalEdit';
import AccountTypeCell from './AccountTypeCell';
import formatCurrency from '@/helpers/formatCurrency';

const Accounts: FC = () => {
  const { data, isLoading } = useQuery(queries.ACCOUNTS, getAccounts);

  if (isLoading) {
    return <Loader />;
  }

  const columns: Column<Account>[] = [
    {
      key: 'actions',
      title: '',
      renderCell: (row) => (
        <div>
          <ModalDeleteAccount id={row.id} name={row.name} />
          <ModalEdit initialValues={row} />
        </div>
      ),
      collapsing: true,
    },
    { key: 'name', title: 'Заголовок', renderCell: (row) => row.name },
    {
      key: 'accountType',
      title: 'Тип счета',
      renderCell: (row) => (
        <AccountTypeCell accountTypeId={row.accountTypeId} />
      ),
    },
    {
      key: 'balance',
      title: 'Баланс',
      renderCell: ({ balance, currency }) => formatCurrency(balance, currency),
    },
  ];

  return (
    <>
      <Header as="h1">Счета</Header>
      <ModalAddForm />
      {data && <AppTable columns={columns} data={data} />}
    </>
  );
};

export default Accounts;
