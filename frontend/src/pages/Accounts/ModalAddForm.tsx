import { createAccount } from '@/api/accounts';
import FormModal from '@/components/FormModal';
import { Button } from '@/components/ui';
import { MODAL_ADD_ACCOUNT } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { CreateAccount } from '@/models/CreateAccount';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import AccountForm, { AccountFormValues } from './AccountForm';

const INITIAL_VALUES: AccountFormValues = {
  name: '',
  currency: 'USD',
  accountType: '',
} as const;

const ModalAddForm: FC = () => {
  const { close } = useModalState(MODAL_ADD_ACCOUNT);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createAccount, {
    onSuccess: (data) => {
      toast.success(`Счет "${data.name}" успешно добавлен`);
      close();
    },
    onError: () => {
      toast.error('Не удалось добавить счет');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNTS);
    },
  });

  const handleSubmit = (values: AccountFormValues) => {
    mutate(getCreateAccountData(values));
  };

  return (
    <FormModal
      title="Добавление счета"
      submitting={isLoading}
      modalId={MODAL_ADD_ACCOUNT}
      submitButtonLabel="Создать"
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
    >
      <AccountForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />
    </FormModal>
  );
};

function getCreateAccountData(formValues: AccountFormValues): CreateAccount {
  return {
    ...formValues,
    accountType: Number(formValues.accountType),
  };
}

export default ModalAddForm;
