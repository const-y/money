import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

import { Account, updateAccount } from '@/api/accounts';
import queries from '@/constants/queries';

import AccountForm, { AccountFormValues } from './AccountForm';

interface ModalEditProps {
  initialValues: Account;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateAccount, {
    onSuccess: (data) => {
      toast.success(`Счет "${data.name}" успешно обновлен`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось обновить счет');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNTS);
    },
  });

  const formId = 'form';

  const handleSubmit = (values: AccountFormValues) => {
    mutate({ ...initialValues, ...values });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon link name="pencil alternate" />}
    >
      <Modal.Header>Редактирование типа счета</Modal.Header>
      <Modal.Content>
        <AccountForm
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

export default ModalEdit;
