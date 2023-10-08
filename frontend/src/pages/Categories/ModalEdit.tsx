import { Category, updateCategory } from '@/api/categories';
import FormModal from '@/components/FormModal';
import { MODAL_EDIT_CATEGORY } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import CategoryForm, { CategoryFormValues } from './CategoryForm';

interface ModalEditProps {
  initialValues: CategoryFormValues;
  categoryId: number;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues, categoryId }) => {
  const { close } = useModalState(MODAL_EDIT_CATEGORY);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success('Запись успешно обновлена');
      close();
    },
    onError: () => {
      toast.error('Не удалось обновить категорию');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.CATEGORIES);
    },
  });

  const handleSubmit = (values: CategoryFormValues) => {
    mutate(getUpdateCategoryData({ categoryId, formValues: values }));
  };

  return (
    <FormModal
      title="Редактирование курса валют"
      submitting={isLoading}
      modalId={MODAL_EDIT_CATEGORY}
      trigger={<Icon link name="pencil alternate" />}
      submitButtonLabel="Сохранить"
    >
      <CategoryForm initialValues={initialValues} onSubmit={handleSubmit} />
    </FormModal>
  );
};

function getUpdateCategoryData({
  categoryId,
  formValues,
}: {
  categoryId: number;
  formValues: CategoryFormValues;
}): Category {
  return {
    id: categoryId,
    ...formValues,
  };
}

export default ModalEdit;
