import { ExchangeRate } from '@/api/exchangeRates';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormik } from 'formik';
import { FC } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Form } from 'semantic-ui-react';
import * as Yup from 'yup';

export interface ExchangeRateFormValues {
  date: Date;
  currency: string;
  baseCurrency: string;
  rate: number;
}

interface ExchangeRateFormProps {
  id: string;
  initialValues: ExchangeRateFormValues;
  onSubmit: (values: ExchangeRateFormValues) => void;
}

const TransferSchema = Yup.object().shape({
  date: Yup.date().required(REQUIRED_FIELD_ERROR_MESSAGE),
  currency: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
  baseCurrency: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
  rate: Yup.number().required(REQUIRED_FIELD_ERROR_MESSAGE),
});

const ExchangeRateForm: FC<ExchangeRateFormProps> = ({
  initialValues,
  onSubmit,
  id,
}) => {
  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<ExchangeRateFormValues>({
      initialValues,
      validationSchema: TransferSchema,
      onSubmit,
    });

  const getError = (fieldName: keyof ExchangeRateFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <SemanticDatepicker
        name="date"
        value={values.date}
        onChange={(_event, data) => setFieldValue('date', data.value)}
        format="YYYY-MM-DD"
        label="Выберите дату"
        required
        error={getError('date')}
      />
      <Form.Input
        name="currency"
        label="Валюта"
        placeholder="Валюта"
        value={values.currency}
        error={getError('currency')}
        onChange={handleChange}
        required
      />
      <Form.Input
        name="baseCurrency"
        label="Базовая валюта"
        placeholder="Базовая валюта"
        value={values.baseCurrency}
        error={getError('baseCurrency')}
        onChange={handleChange}
        required
      />
      <Form.Input
        name="rate"
        label="Курс"
        placeholder="Курс валюты относительно базовой"
        value={values.rate}
        error={getError('rate')}
        onChange={handleChange}
        required
      />
    </Form>
  );
};

export default ExchangeRateForm;
