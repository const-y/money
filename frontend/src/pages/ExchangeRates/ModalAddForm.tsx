import {
  CreateExchangeRateData,
  createExchangeRate,
} from '@/api/exchangeRates';
import FormModal from '@/components/FormModal';
import { MODAL_ADD_EXCHANGE_RATE } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import assertCurrency from '@/helpers/assertCurrency';
import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import ExchangeRateForm, { ExchangeRateFormValues } from './ExhangeRateForm';
import { Button } from '@/components/ui';

const INITIAL_VALUES: ExchangeRateFormValues = {
  date: new Date(),
  currency: '',
  baseCurrency: '',
  rate: 0,
};

const ModalAddForm: FC = () => {
  const { close } = useModalState(MODAL_ADD_EXCHANGE_RATE);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createExchangeRate, {
    onSuccess: (data) => {
      toast.success(`Запись успешно добавлена`);
      close();
    },
    onError: () => {
      toast.error('Не удалось добавить курс валюты');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.EXCHANGE_RATES);
    },
  });

  const handleSubmit = (values: ExchangeRateFormValues) => {
    mutate(getCreateExchangeRateData(values));
  };

  return (
    <FormModal
      title="Добавление курса валют"
      submitting={isLoading}
      modalId={MODAL_ADD_EXCHANGE_RATE}
      trigger={
        <Button basic>
          <Icon name="plus" />
          Добавить
        </Button>
      }
      submitButtonLabel="Создать"
    >
      <ExchangeRateForm
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
      />
    </FormModal>
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
    baseCurrency,
    date: date.toISOString(),
    rate,
  };
}

export default ModalAddForm;
