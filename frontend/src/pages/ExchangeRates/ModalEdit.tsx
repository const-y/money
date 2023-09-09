import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { Icon } from 'semantic-ui-react';
import { ExchangeRate, updateExchangeRate } from '@/api/exchangeRates';
import FormModal from '@/components/FormModal';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import assertCurrency from '@/helpers/assertCurrency';
import generateId from '@/helpers/generateId';
import ExchangeRateForm, { ExchangeRateFormValues } from './ExhangeRateForm';
import { MODAL_EDIT_EXCHANGE_RATE } from '@/constants/modalIds';

interface ModalEditProps {
  initialValues: ExchangeRateFormValues;
  exchangeRateId: number;
}

const ModalEdit: FC<ModalEditProps> = ({ initialValues, exchangeRateId }) => {
  const { close } = useModalState(MODAL_EDIT_EXCHANGE_RATE);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateExchangeRate, {
    onSuccess: () => {
      toast.success('Запись успешно обновлена');
      close();
    },
    onError: () => {
      toast.error('Не удалось обновить курс');
    },
    onSettled: () => {
      queryClient.invalidateQueries(queries.EXCHANGE_RATES);
    },
  });

  const handleSubmit = (values: ExchangeRateFormValues) => {
    assertCurrency(values.currency);
    assertCurrency(values.baseCurrency);

    mutate(getUpdateExchangeRateData({ exchangeRateId, formValues: values }));
  };

  return (
    <FormModal
      title="Редактирование курса валют"
      submitting={isLoading}
      modalId={MODAL_EDIT_EXCHANGE_RATE}
      trigger={<Icon link name="pencil alternate" />}
      submitButtonLabel="Сохранить"
    >
      <ExchangeRateForm initialValues={initialValues} onSubmit={handleSubmit} />
    </FormModal>
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
    baseCurrency,
    date: date.toISOString(),
    rate,
  };
}

export default ModalEdit;
