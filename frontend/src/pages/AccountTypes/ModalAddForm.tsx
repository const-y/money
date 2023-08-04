import { createAccountType } from '@/api/accountTypes';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import AccountTypeForm, { AccountTypeFormValues } from './AccountTypeForm';

const ModalAddForm: FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createAccountType, {
    onSuccess: (data) => {
      toast.success(`Запись "${data.title}" успешно добавлена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось добавить новый тип счета');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNT_TYPES);
    },
  });

  const formId = 'form';

  const handleSubmit = (values: AccountTypeFormValues) => {
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
      <Modal.Header>Добавление типа счета</Modal.Header>
      <Modal.Content>
        <AccountTypeForm
          id={formId}
          initialValues={{ title: '' }}
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
