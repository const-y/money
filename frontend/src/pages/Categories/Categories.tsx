import { FC } from 'react';
import { useQuery } from 'react-query';
import { Header, Loader } from 'semantic-ui-react';

import { Category, getCategoryList } from '@/api/categories';
import AppTable, { Column } from '@/components/AppTable';
import queries from '@/constants/queries';
import ModalAddForm from './ModalAddForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ColorLegend from './ColorLegend';

const Categories: FC = () => {
  const { data, isLoading } = useQuery(queries.CATEGORIES, getCategoryList);

  if (isLoading) {
    return <Loader />;
  }

  const columns: Column<Category>[] = [
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

  return (
    <>
      <Header as="h1">Категории</Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <ModalAddForm />
        <ColorLegend />
      </div>
      {data && (
        <AppTable columns={columns} data={data} getRowOptions={getRowOptions} />
      )}
    </>
  );
};

function getRowOptions({ isExpense }: Category) {
  const positive = !isExpense;
  const negative = isExpense;

  return { positive, negative };
}

export default Categories;
