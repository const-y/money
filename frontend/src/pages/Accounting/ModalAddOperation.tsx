import {
  CreateOperationRequestParams,
  createOperation,
} from '@/api/operations';
import FormModal from '@/components/FormModal';
import { MODAL_ADD_OPERATION } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import assertIsDate from '@/helpers/assertIsDate';
import assertIsNumber from '@/helpers/assertIsNumber';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon } from 'semantic-ui-react';
import OperationForm, { OperationFormValues } from './OperationForm';

interface ModalAddOperationProps {
  accountId: number;
}

const initialValues: OperationFormValues = {
  amount: 0,
  date: new Date(),
  description: '',
  categoryId: null,
  counterpartyId: 0,
  isExpense: true,
};

const ModalAddOperation: FC<ModalAddOperationProps> = ({ accountId }) => {
  const { close } = useModalState(MODAL_ADD_OPERATION);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createOperation, {
    onSuccess: () => {
      toast.success(`Операция успешно добавлена`);
      close();
    },
    onError: () => {
      toast.error('Не удалось добавить операцию');
    },
    onSettled: () => {
      queryClient.invalidateQueries([queries.ACCOUNTS]);
    },
  });

  const handleSubmit = (formValues: OperationFormValues) => {
    const absAmount = Math.abs(formValues.amount);
    const isExpense = formValues.isExpense;

    const correctedFormValues = {
      ...formValues,
      amount: isExpense ? 0 - absAmount : absAmount,
    };

    mutate(getAddOperationData({ accountId, formValues: correctedFormValues }));
  };

  return (
    <FormModal
      title={'Добавление операции'}
      submitting={isLoading}
      modalId={MODAL_ADD_OPERATION}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить операцию
        </Button>
      }
      submitButtonLabel="Создать"
    >
      <OperationForm initialValues={initialValues} onSubmit={handleSubmit} />
    </FormModal>
  );
};

function getAddOperationData({
  accountId,
  formValues,
}: {
  accountId: number;
  formValues: OperationFormValues;
}): CreateOperationRequestParams {
  const { amount, description, date, categoryId, counterpartyId } = formValues;

  assertIsDate(date);
  assertIsNumber(categoryId);

  return {
    account: accountId,
    amount,
    date: date.toISOString(),
    description,
    category: categoryId,
    counterparty: counterpartyId,
  };
}

export default ModalAddOperation;
