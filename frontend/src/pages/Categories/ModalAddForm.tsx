import { createCategory } from '@/api/categories';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import ExchangeRateForm, { CategoryFormValues } from './CategoryForm';

const INITIAL_VALUES: CategoryFormValues = {
  name: '',
  isExpense: true,
};

const ModalAddForm: FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createCategory, {
    onSuccess: () => {
      toast.success(`Запись успешно добавлена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось добавить категорию');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.CATEGORIES);
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = (values: CategoryFormValues) => {
    mutate(values);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
    >
      <Modal.Header>Добавление категории</Modal.Header>
      <Modal.Content>
        <ExchangeRateForm
          id={formId}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)}>
          Отмена
        </Button>
        <Button type="submit" positive form={formId} loading={isLoading}>
          Создать
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalAddForm;