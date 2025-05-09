import { DatePicker, Stack, TextInput } from '@/components/ui';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormId } from '@/context/FormId';
import assertIsString from '@/helpers/assertIsString';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

export interface ExchangeRateFormValues {
  date: Date;
  currency: string;
  baseCurrency: string;
  rate: number;
}

interface ExchangeRateFormProps {
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
}) => {
  const formId = useFormId();

  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<ExchangeRateFormValues>({
      initialValues,
      validationSchema: TransferSchema,
      onSubmit,
    });

  const getError = (
    fieldName: keyof ExchangeRateFormValues
  ): string | undefined => {
    const error = touched[fieldName] ? errors[fieldName] : undefined;

    if (error) {
      assertIsString(error);
    }

    return error;
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Stack gap="sm">
        <DatePicker
          value={values.date}
          onChange={(value) => setFieldValue('date', value)}
          label="Выберите дату"
          required
          error={getError('date')}
        />
        <TextInput
          name="currency"
          label="Валюта"
          placeholder="Валюта"
          value={values.currency}
          error={getError('currency')}
          onChange={handleChange}
          required
        />
        <TextInput
          name="baseCurrency"
          label="Базовая валюта"
          placeholder="Базовая валюта"
          value={values.baseCurrency}
          error={getError('baseCurrency')}
          onChange={handleChange}
          required
        />
        <TextInput
          name="rate"
          label="Курс"
          placeholder="Курс валюты относительно базовой"
          value={values.rate}
          error={getError('rate')}
          onChange={handleChange}
          required
        />
      </Stack>
    </form>
  );
};

export default ExchangeRateForm;
