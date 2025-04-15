import { AccountType } from '@/api/accountTypes';
import { Column, createActionColumn } from '@/components/AppTable';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const accountTypesColumns: Column<AccountType>[] = [
  createActionColumn((row) => (
    <div>
      <ModalDelete id={row.id} title={row.title} />
      <ModalEdit initialValues={row} />
    </div>
  )),
  { key: 'title', title: 'Заголовок', renderCell: (row) => row.title },
];

export default accountTypesColumns;
