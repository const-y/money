import { createAccountType } from '@/api/accountTypes';
import FormModal from '@/components/FormModal';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon } from 'semantic-ui-react';
import AccountTypeForm, { AccountTypeFormValues } from './AccountTypeForm';
import { MODAL_ADD_ACCOUNT_TYPE } from '@/constants/modalIds';

const INITIAL_VALUES = { title: '' };

const ModalAddForm: FC = () => {
  const { close } = useModalState(MODAL_ADD_ACCOUNT_TYPE);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createAccountType, {
    onSuccess: (data) => {
      toast.success(`Запись "${data.title}" успешно добавлена`);
      close();
    },
    onError: () => {
      toast.error('Не удалось добавить новый тип счета');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.ACCOUNT_TYPES);
    },
  });

  const handleSubmit = (values: AccountTypeFormValues) => {
    mutate(values);
  };

  return (
    <FormModal
      title="Добавление типа счета"
      submitting={isLoading}
      modalId={MODAL_ADD_ACCOUNT_TYPE}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
      submitButtonLabel="Создать"
    >
      <AccountTypeForm initialValues={INITIAL_VALUES} onSubmit={handleSubmit} />
    </FormModal>
  );
};

export default ModalAddForm;
