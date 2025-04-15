import { Column } from '@/components/AppTable';
import formatCurrency from '@/helpers/formatCurrency';
import Account from '@/models/Account';
import AccountTypeCell from './AccountTypeCell';
import ModalDeleteAccount from './ModalDeleteAccount';
import ModalEdit from './ModalEdit';

const accountsColumns: Column<Account>[] = [
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

export default accountsColumns;
