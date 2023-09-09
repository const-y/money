import { AccountType, updateAccountType } from '@/api/accountTypes';
import FormModal from '@/components/FormModal';
import { MODAL_EDIT_ACCOUNT_TYPE } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import AccountTypeForm, { AccountTypeFormValues } from './AccountTypeForm';

interface ModalEditProps {
  initialValues: AccountType;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues }) => {
  const { close } = useModalState(MODAL_EDIT_ACCOUNT_TYPE);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateAccountType, {
    onSuccess: (data) => {
      toast.success(`Запись "${data.title}" успешно обновлена`);
      close();
    },
    onError: () => {
      toast.error('Не удалось обновить тип счета');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNT_TYPES);
    },
  });

  const handleSubmit = (values: AccountTypeFormValues) => {
    mutate({ ...initialValues, ...values });
  };

  return (
    <FormModal
      submitButtonLabel="Сохранить"
      title="Редактирование типа счета"
      submitting={isLoading}
      modalId={MODAL_EDIT_ACCOUNT_TYPE}
      trigger={<Icon link name="pencil alternate" />}
    >
      <AccountTypeForm initialValues={initialValues} onSubmit={handleSubmit} />
    </FormModal>
  );
};

export default ModalEdit;
