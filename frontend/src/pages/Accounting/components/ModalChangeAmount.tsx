import { Transaction, createTransaction } from '@/api/transactions';
import queries from '@/constants/queries';
import { FC, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon, Loader, Modal } from 'semantic-ui-react';
import ChangeAmountForm, { ChangeAmountFormValues } from './ChangeAmountForm';
import { getAccount } from '@/api/accounts';
import assertIsNumber from '@/helpers/assertIsNumber';
import assertIsDate from '@/helpers/assertIsDate';
import { Button } from '@/components/ui';

interface ModalChangeAmountProps {
  accountId: number;
}

const TRANSFER_MODAL_TITLE = 'Изменить остаток';

const ModalChangeAmount: FC<ModalChangeAmountProps> = ({ accountId }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: account, isLoading: isAccountLoading } = useQuery(
    [queries.ACCOUNTS, accountId],
    () => getAccount(accountId)
  );
  const { mutate, isLoading } = useMutation(createTransaction, {
    onSuccess: () => {
      toast.success(`Остаток успешно изменен`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось изменить остаток');
    },
    onSettled: () => {
      queryClient.invalidateQueries([queries.ACCOUNTS]);
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = ({ date, newAmount }: ChangeAmountFormValues) => {
    const accountBalance = account?.balance;
    assertIsNumber(accountBalance);
    assertIsDate(date);

    const transactionData = createChangeAmountTransaction({
      date,
      accountId,
      accountBalance,
      newBalance: newAmount,
    });

    mutate(transactionData);
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
          <Icon name="balance scale" />
          {TRANSFER_MODAL_TITLE}
        </Button>
      }
    >
      <Modal.Header>{TRANSFER_MODAL_TITLE}</Modal.Header>
      <Modal.Content>
        {isAccountLoading ? (
          <Loader active />
        ) : (
          <ChangeAmountForm
            id={formId}
            initialValues={getInitialValues(account?.balance || 0)}
            onSubmit={handleSubmit}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={handleClose}>
          Отмена
        </Button>
        <Button type="submit" positive form={formId} loading={isLoading}>
          {TRANSFER_MODAL_TITLE}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

function getInitialValues(currentAmount: number): ChangeAmountFormValues {
  return {
    date: new Date(),
    newAmount: currentAmount,
  };
}

interface CreateChangeAmountTransactionArg {
  date: Date;
  accountId: number;
  accountBalance: number;
  newBalance: number;
}

function createChangeAmountTransaction({
  date,
  accountId,
  newBalance,
  accountBalance,
}: CreateChangeAmountTransactionArg): Transaction {
  const amount = newBalance - accountBalance;

  return {
    operations: [{ account: accountId, amount }],
    description: 'Изменение остатка',
    date: date.toISOString(),
  };
}

export default ModalChangeAmount;
