import { Category } from '@/api/categories';
import { Column } from '@/components/AppTable';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const categoriesColumns: Column<Category>[] = [
  {
    key: 'actions',
    title: '',
    renderCell: (row) => (
      <div>
        <ModalDelete id={row.id} title={row.name} />
        <ModalEdit categoryId={row.id} initialValues={row} />
      </div>
    ),
    collapsing: true,
  },
  {
    key: 'name',
    title: 'Название',
    renderCell: ({ name }) => name,
  },
];

export default categoriesColumns;
