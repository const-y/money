import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

import { Category, updateCategory } from '@/api/categories';
import queries from '@/constants/queries';
import ExchangeRateForm, { CategoryFormValues } from './CategoryForm';

interface ModalEditProps {
  initialValues: CategoryFormValues;
  categoryId: number;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues, categoryId }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateCategory, {
    onSuccess: () => {
      toast.success('Запись успешно обновлена');
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось обновить категорию');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.CATEGORIES);
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = (values: CategoryFormValues) => {
    mutate(getUpdateCategoryData({ categoryId, formValues: values }));
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon link name="pencil alternate" />}
    >
      <Modal.Header>Редактирование курса валют</Modal.Header>
      <Modal.Content>
        <ExchangeRateForm
          id={formId}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)}>
          Отмена
        </Button>
        <Button type="submit" positive form={formId} loading={isLoading}>
          Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
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
