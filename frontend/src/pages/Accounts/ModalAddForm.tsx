import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import AccountForm, { AccountFormValues } from './AccountForm';
import { createAccount } from '@/api/accounts';

const ModalAddForm: FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createAccount, {
    onSuccess: (data) => {
      toast.success(`Счет "${data.name}" успешно добавлен`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось добавить счет');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNTS);
    },
  });

  const formId = 'form';

  const handleSubmit = (values: AccountFormValues) => {
    mutate(values);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
    >
      <Modal.Header>Добавление счета</Modal.Header>
      <Modal.Content>
        <AccountForm
          id={formId}
          initialValues={{ name: '', currency: 'USD', accountTypeId: '' }}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={handleClose}>
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
