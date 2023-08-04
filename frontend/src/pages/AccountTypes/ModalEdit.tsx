import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

import { AccountType, updateAccountType } from '@/api/accountTypes';
import queries from '@/constants/queries';
import AccountTypeForm, { AccountTypeFormValues } from './AccountTypeForm';

interface ModalEditProps {
  initialValues: AccountType;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateAccountType, {
    onSuccess: (data) => {
      toast.success(`Запись "${data.title}" успешно обновлена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось обновить тип счета');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNT_TYPES);
    },
  });

  const formId = 'form';

  const handleSubmit = (values: AccountTypeFormValues) => {
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
        <AccountTypeForm
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
