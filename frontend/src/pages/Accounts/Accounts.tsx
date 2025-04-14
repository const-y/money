import { getAccounts } from '@/api/accounts';
import AppTable, { Column } from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_ACCOUNT } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import formatCurrency from '@/helpers/formatCurrency';
import Account from '@/models/Account';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';
import AccountTypeCell from './AccountTypeCell';
import ModalAddForm from './ModalAddForm';
import ModalDeleteAccount from './ModalDeleteAccount';
import ModalEdit from './ModalEdit';

const Accounts: FC = () => {
  const { data, isLoading } = useQuery(queries.ACCOUNTS, getAccounts);
  const { open } = useModalState(MODAL_ADD_ACCOUNT);

  if (isLoading || !data) {
    return <Loader />;
  }

  const columns: Column<Account>[] = [
    {
      key: 'actions',
      title: '',
      renderCell: (row) => (
        <div>
          <ModalDeleteAccount id={row.id} name={row.name} />
          <ModalEdit account={row} />
        </div>
      ),
      collapsing: true,
    },
    { key: 'name', title: 'Заголовок', renderCell: (row) => row.name },
    {
      key: 'accountType',
      title: 'Тип счета',
      renderCell: (row) => <AccountTypeCell accountTypeId={row.accountType} />,
    },
    {
      key: 'balance',
      title: 'Баланс',
      renderCell: ({ balance, currency }) => formatCurrency(balance, currency),
    },
  ];

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Счета</PageTitle>
      {data.length === 0 ? (
        <EmptyState
          title="Еще не создано ни одного счета"
          description="Счета необходимы для создания транзакций"
          actionLabel="Добавить счет"
          onActionClick={open}
        />
      ) : (
        <AppTable columns={columns} data={data} />
      )}
    </>
  );
};

export default Accounts;
