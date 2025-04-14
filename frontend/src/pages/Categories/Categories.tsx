import { FC } from 'react';
import { useQuery } from 'react-query';
import { Header, Loader } from 'semantic-ui-react';

import { Category, getCategoryList } from '@/api/categories';
import AppTable, { Column } from '@/components/AppTable';
import queries from '@/constants/queries';
import ModalAddForm from './ModalAddForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { EmptyState, PageTitle } from '@/components/ui';
import { useModalState } from '@/context/ModalState';
import { MODAL_ADD_CATEGORY } from '@/constants/modalIds';

const Categories: FC = () => {
  const { data, isLoading } = useQuery(queries.CATEGORIES, getCategoryList);
  const { open } = useModalState(MODAL_ADD_CATEGORY);

  if (isLoading || !data) {
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
      <PageTitle rightSlot={<ModalAddForm />}>Категории</PageTitle>
      {data.length === 0 ? (
        <EmptyState
          title="Еще не создано ни одной категории"
          description="Категории необходимы для учетов доходов и расходов"
          actionLabel="Добавить категорию"
          onActionClick={open}
        />
      ) : (
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
