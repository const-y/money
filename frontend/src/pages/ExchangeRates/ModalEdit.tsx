import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';

import { AccountType, updateAccountType } from '@/api/accountTypes';
import queries from '@/constants/queries';
import ExchangeRateForm, { ExchangeRateFormValues } from './ExhangeRateForm';
import { ExchangeRate, updateExchangeRate } from '@/api/exchangeRates';
import assertCurrency from '@/helpers/assertCurrency';

interface ModalEditProps {
  initialValues: ExchangeRateFormValues;
  exchangeRateId: number;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues, exchangeRateId }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateExchangeRate, {
    onSuccess: () => {
      toast.success('Запись успешно обновлена');
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось обновить курс');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.EXCHANGE_RATES);
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = (values: ExchangeRateFormValues) => {
    assertCurrency(values.currency);
    assertCurrency(values.baseCurrency);

    mutate(getUpdateExchangeRateData({ exchangeRateId, formValues: values }));
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon link name="pencil alternate" />}
    >
      <Modal.Header>Редактирование курса валют</Modal.Header>
      <Modal.Content>
        <ExchangeRateForm
          id={formId}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)}>
          Отмена
        </Button>
        <Button type="submit" positive form={formId} loading={isLoading}>
          Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

function getUpdateExchangeRateData({
  exchangeRateId,
  formValues,
}: {
  exchangeRateId: number;
  formValues: ExchangeRateFormValues;
}): ExchangeRate {
  const { currency, baseCurrency, date, rate } = formValues;
  assertCurrency(currency);
  assertCurrency(baseCurrency);

  return {
    id: exchangeRateId,
    currency: currency,
    base_currency: baseCurrency,
    date: date.toISOString(),
    rate,
  };
}

export default ModalEdit;
