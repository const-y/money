import { Transaction, createTransaction } from '@/api/transactions';
import assertIsDate from '@/helpers/assertIsDate';
import assertIsNumber from '@/helpers/assertIsNumber';
import getOperationsQueryKey from '@/helpers/getOperationsQueryKey';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import TransferForm, { TransferFormValues } from './ TransferForm';

interface ModalTransferProps {
  sourceAccountId: number;
}

const ModalTransfer: FC<ModalTransferProps> = ({ sourceAccountId }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createTransaction, {
    onSuccess: () => {
      toast.success(`Перевод успешно выполнен`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось выполнить перевод');
    },
    onSettled: () => {
      queryClient.invalidateQueries(getOperationsQueryKey(sourceAccountId));
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = (transferFormValues: TransferFormValues) => {
    mutate(createTransferTransactionData(transferFormValues));
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
          <Icon name="exchange" />
          Перевод между счетами
        </Button>
      }
    >
      <Modal.Header>Перевод между счетами</Modal.Header>
      <Modal.Content>
        <TransferForm
          id={formId}
          initialValues={getInitialValues(sourceAccountId)}
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
  const TRANSFER_CATEGORY_ID = 3;

  assertIsDate(date);
  assertIsNumber(sourceAccountId);
  assertIsNumber(targetAccountId);

  return {
    description,
    date: date.toISOString(),
    category: TRANSFER_CATEGORY_ID,
    operations: [
      { account: sourceAccountId, amount: sourceAmount },
      { account: targetAccountId, amount: targetAmount },
    ],
  };
}

export default ModalTransfer;
