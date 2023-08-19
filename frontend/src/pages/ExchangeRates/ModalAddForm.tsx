import {
  CreateExchangeRateData,
  createExchangeRate,
} from '@/api/exchangeRates';
import queries from '@/constants/queries';
import assertCurrency from '@/helpers/assertCurrency';
import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Button, Icon, Modal } from 'semantic-ui-react';
import ExchangeRateForm, { ExchangeRateFormValues } from './ExhangeRateForm';

const INITIAL_VALUES: ExchangeRateFormValues = {
  date: new Date(),
  currency: '',
  baseCurrency: '',
  rate: 0,
};

const ModalAddForm: FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createExchangeRate, {
    onSuccess: (data) => {
      toast.success(`Запись успешно добавлена`);
      setOpen(false);
    },
    onError: () => {
      toast.error('Не удалось добавить курс валюты');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.EXCHANGE_RATES);
    },
  });

  const formId = self.crypto.randomUUID();

  const handleSubmit = (values: ExchangeRateFormValues) => {
    mutate(getCreateExchangeRateData(values));
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
    >
      <Modal.Header>Добавление курса валют</Modal.Header>
      <Modal.Content>
        <ExchangeRateForm
          id={formId}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic onClick={() => setOpen(false)}>
          Отмена
        </Button>
        <Button type="submit" positive form={formId} loading={isLoading}>
          Создать
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

function getCreateExchangeRateData(
  formValues: ExchangeRateFormValues
): CreateExchangeRateData {
  const { currency, baseCurrency, date, rate } = formValues;
  assertCurrency(currency);
  assertCurrency(baseCurrency);

  return {
    currency,
    base_currency: baseCurrency,
    date: date.toISOString(),
    rate,
  };
}

export default ModalAddForm;
