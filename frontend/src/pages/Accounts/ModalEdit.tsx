import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';

import { updateAccount } from '@/api/accounts';
import FormModal from '@/components/FormModal';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import assertIsNumber from '@/helpers/assertIsNumber';

import { MODAL_EDIT_ACCOUNT } from '@/constants/modalIds';
import AccountForm, { AccountFormValues } from './AccountForm';
import Account from '@/models/Account';

interface ModalEditProps {
  account: Account;
}

const ModalEdit: FC<ModalEditProps> = ({ account }) => {
  const { close } = useModalState(MODAL_EDIT_ACCOUNT);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateAccount, {
    onSuccess: (data) => {
      toast.success(`Счет "${data.name}" успешно обновлен`);
      close();
    },
    onError: () => {
      toast.error('Не удалось обновить счет');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNTS);
    },
  });

  const handleSubmit = (values: AccountFormValues) => {
    mutate(updateAccountData(account, values));
  };

  return (
    <FormModal
      title="Редактирование счета"
      submitting={isLoading}
      modalId={MODAL_EDIT_ACCOUNT}
      submitButtonLabel="Сохранить"
      trigger={<Icon link name="pencil alternate" />}
    >
      <AccountForm initialValues={account} onSubmit={handleSubmit} />
    </FormModal>
  );
};

function updateAccountData(
  account: Account,
  formValues: AccountFormValues
): Account {
  const { accountType } = formValues;
  assertIsNumber(accountType);

  return {
    ...account,
    ...formValues,
    accountType,
  };
}

export default ModalEdit;
