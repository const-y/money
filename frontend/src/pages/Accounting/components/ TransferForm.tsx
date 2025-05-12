import AccountSelectField from '@/components/AccountSelectField';
import { DatePicker, Stack, TextInput } from '@/components/ui';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormId } from '@/context/FormId';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

export interface TransferFormValues {
  date: Date | null;
  description: string;
  sourceAccountId: number | null;
  sourceAmount: number;
  targetAccountId: number | null;
  targetAmount: number;
}

interface TransferFormProps {
  initialValues: TransferFormValues;
  onSubmit: (values: TransferFormValues) => void;
}

const validateAmount = Yup.number()
  .required(REQUIRED_FIELD_ERROR_MESSAGE)
  .test('not-zero', 'Значение не должно быть равно 0', (value) => value !== 0);

const TransferSchema = Yup.object().shape({
  date: Yup.date().required(REQUIRED_FIELD_ERROR_MESSAGE),
  sourceAccountId: Yup.number().required(REQUIRED_FIELD_ERROR_MESSAGE),
  sourceAmount: validateAmount,
  targetAccountId: Yup.number().required(REQUIRED_FIELD_ERROR_MESSAGE),
  targetAmount: validateAmount,
});

const TransferForm: FC<TransferFormProps> = ({ initialValues, onSubmit }) => {
  const formId = useFormId();
  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<TransferFormValues>({
      initialValues,
      validationSchema: TransferSchema,
      onSubmit,
    });

  const handleDateChange = (value: Date) => {
    setFieldValue('date', value);
  };

  const createAccountSelectChangeHandler =
    (fieldName: keyof TransferFormValues) => (value: number) => {
      setFieldValue(fieldName, value);
    };

  const getError = (fieldName: keyof TransferFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Stack gap="sm">
        <DatePicker
          value={values.date}
          onChange={handleDateChange}
          required
          error={getError('date')}
        />
        <TextInput
          name="description"
          label="Описание"
          placeholder="Описание"
          value={values.description}
          error={getError('description')}
          onChange={handleChange}
          required
        />
        <AccountSelectField
          value={values.sourceAccountId}
          onChange={createAccountSelectChangeHandler('sourceAccountId')}
          label="Источник"
          placeholder="Выберите счет с которого взять деньги"
          error={getError('sourceAccountId')}
        />
        <TextInput
          name="sourceAmount"
          label="Сума снятия"
          placeholder="Сумма снятия в валюте источника"
          value={values.sourceAmount}
          error={getError('sourceAmount')}
          onChange={handleChange}
          required
        />
        <AccountSelectField
          value={values.targetAccountId}
          onChange={createAccountSelectChangeHandler('targetAccountId')}
          label="Назначение"
          placeholder="Выберите счет куда положить деньги"
          error={getError('targetAccountId')}
        />
        <TextInput
          name="targetAmount"
          label="Сумма зачисления"
          placeholder="Сумма зачисления в валюте источника"
          value={values.targetAmount}
          error={getError('targetAmount')}
          onChange={handleChange}
          required
        />
      </Stack>
    </form>
  );
};

export default TransferForm;
