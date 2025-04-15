import { AccountType } from '@/api/accountTypes';
import { Column } from '@/components/AppTable';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const accountTypesColumns: Column<AccountType>[] = [
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

export default accountTypesColumns;
