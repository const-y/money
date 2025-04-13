import { createCategory } from '@/api/categories';
import FormModal from '@/components/FormModal';
import { MODAL_ADD_CATEGORY } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import CategoryForm, { CategoryFormValues } from './CategoryForm';
import { Button } from '@/components/ui';

const INITIAL_VALUES: CategoryFormValues = {
  name: '',
  isExpense: true,
};

const ModalAddForm: FC = () => {
  const { close } = useModalState(MODAL_ADD_CATEGORY);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: () => {
      toast.success(`Запись успешно добавлена`);
      close();
    },
    onError: () => {
      toast.error('Не удалось добавить категорию');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.CATEGORIES);
    },
  });

  const handleSubmit = (values: CategoryFormValues) => {
    mutate(values);
  };

  return (
    <FormModal
      title="Добавление категории"
      submitting={isLoading}
      modalId={MODAL_ADD_CATEGORY}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
      submitButtonLabel="Создать"
    >
      <CategoryForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />
    </FormModal>
  );
};

export default ModalAddForm;
