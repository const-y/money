import { Category } from '@/api/categories';
import { Column, createActionColumn } from '@/components/AppTable';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const categoriesColumns: Column<Category>[] = [
  createActionColumn((row) => (
    <div>
      <ModalDelete id={row.id} title={row.name} />
      <ModalEdit categoryId={row.id} initialValues={row} />
    </div>
  )),
  {
    key: 'name',
    title: 'Название',
    renderCell: ({ name }) => name,
  },
];

export default categoriesColumns;
