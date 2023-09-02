import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import AccountForm, { AccountFormValues } from './AccountForm';
import { CreateAccountData, createAccount } from '@/api/accounts';
import assertIsNumber from '@/helpers/assertIsNumber';

const INITIAL_VALUES: AccountFormValues = {
  name: '',
  currency: 'USD',
  accountType: '',
} as const;

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

  const formId = self.crypto.randomUUID();

  const handleSubmit = (values: AccountFormValues) => {
    mutate(getCreateAccountData(values));
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
          initialValues={INITIAL_VALUES}
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

function getCreateAccountData(
  formValues: AccountFormValues
): CreateAccountData {
  assertIsNumber(formValues.accountType);

  return {
    ...formValues,
    accountType: formValues.accountType,
  };
}

export default ModalAddForm;
