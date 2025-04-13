import { Transaction, createTransaction } from '@/api/transactions';
import FormModal from '@/components/FormModal';
import { MODAL_TRANSFER } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import assertIsDate from '@/helpers/assertIsDate';
import assertIsNumber from '@/helpers/assertIsNumber';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import TransferForm, { TransferFormValues } from './ TransferForm';
import { Button } from '@/components/ui';

interface ModalTransferProps {
  sourceAccountId: number;
}

const TRANSFER_MODAL_TITLE = 'Перевод между счетами';

const ModalTransfer: FC<ModalTransferProps> = ({ sourceAccountId }) => {
  const { close } = useModalState(MODAL_TRANSFER);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createTransaction, {
    onSuccess: () => {
      toast.success(`Перевод успешно выполнен`);
      close();
    },
    onError: () => {
      toast.error('Не удалось выполнить перевод');
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        queries.ACCOUNTS,
        sourceAccountId,
        queries.OPERATIONS,
      ]);
    },
  });

  const handleSubmit = (transferFormValues: TransferFormValues) => {
    mutate(createTransferTransactionData(transferFormValues));
  };

  return (
    <FormModal
      title={TRANSFER_MODAL_TITLE}
      submitting={isLoading}
      modalId={MODAL_TRANSFER}
      submitButtonLabel="Создать"
      trigger={
        <Button basic>
          <Icon name="exchange" />
          {TRANSFER_MODAL_TITLE}
        </Button>
      }
    >
      <TransferForm
        initialValues={getInitialValues(sourceAccountId)}
        onSubmit={handleSubmit}
      />
    </FormModal>
  );
};

function getInitialValues(sourceAccountId: number): TransferFormValues {
  return {
    date: new Date(),
    description: '',
    sourceAccountId: sourceAccountId,
    sourceAmount: 0,
    targetAccountId: null,
    targetAmount: 0,
  };
}

function createTransferTransactionData({
  date,
  description,
  sourceAccountId,
  sourceAmount,
  targetAccountId,
  targetAmount,
}: TransferFormValues): Transaction {
  assertIsDate(date);
  assertIsNumber(sourceAccountId);
  assertIsNumber(targetAccountId);

  return {
    description,
    date: date.toISOString(),
    operations: [
      { account: sourceAccountId, amount: -Math.abs(sourceAmount) },
      { account: targetAccountId, amount: targetAmount },
    ],
  };
}

export default ModalTransfer;
