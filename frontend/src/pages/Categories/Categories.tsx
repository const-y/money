import { Category, getCategoryList } from '@/api/categories';
import AppTable from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_CATEGORY } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';
import categoriesColumns from './categoriesColumns';
import ModalAddForm from './ModalAddForm';

const Categories: FC = () => {
  const { data, isLoading } = useQuery(queries.CATEGORIES, getCategoryList);
  const { open } = useModalState(MODAL_ADD_CATEGORY);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Категории</PageTitle>
      <AppTable
        columns={categoriesColumns}
        data={data}
        getRowOptions={getRowOptions}
        renderEmptyState={() => (
          <EmptyState
            title="Еще не создано ни одной категории"
            description="Категории необходимы для учетов доходов и расходов"
            actionLabel="Добавить категорию"
            onActionClick={open}
          />
        )}
      />
    </>
  );
};

function getRowOptions({ isExpense }: Category) {
  const positive = !isExpense;
  const negative = isExpense;

  return { positive, negative };
}

export default Categories;
