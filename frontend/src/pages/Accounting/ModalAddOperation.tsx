import {
  CreateOperationRequestParams,
  createOperation,
} from '@/api/operations';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import OperationForm, { OperationFormValues } from './OperationForm';
import assertIsDate from '@/helpers/assertIsDate';
import assertIsNumber from '@/helpers/assertIsNumber';
import queries from '@/constants/queries';

interface ModalAddOperationProps {
  accountId: number;
}

const initialValues: OperationFormValues = {
  amount: 0,
  date: new Date(),
  description: '',
  categoryId: null,
  counterpartyId: 0,
};

const ModalAddOperation: FC<ModalAddOperationProps> = ({ accountId }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createOperation, {
    onSuccess: () => {
      toast.success(`Операция успешно добавлена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось добавить операцию');
    },
    onSettled: () => {
      queryClient.invalidateQueries([queries.ACCOUNTS]);
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = (formValues: OperationFormValues) => {
    mutate(getAddOperationData({ accountId, formValues }));
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
          Добавить операцию
        </Button>
      }
    >
      <Modal.Header>Добавление операции</Modal.Header>
      <Modal.Content>
        <OperationForm
          id={formId}
          initialValues={initialValues}
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
