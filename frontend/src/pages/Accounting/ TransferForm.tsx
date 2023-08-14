import AccountSelectField from '@/components/AccountSelectField';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormik } from 'formik';
import { FC } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { Form } from 'semantic-ui-react';
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
  id: string;
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

const TransferForm: FC<TransferFormProps> = ({
  initialValues,
  onSubmit,
  id,
}) => {
  const { handleChange, values, errors, handleSubmit, setFieldValue } =
    useFormik<TransferFormValues>({
      initialValues,
      validationSchema: TransferSchema,
      onSubmit,
    });

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <SemanticDatepicker
        name="date"
        value={values.date}
        onChange={(_event, data) => setFieldValue('date', data.value)}
        format="YYYY-MM-DD"
        label="Выберите дату"
        required
        error={errors.date}
      />
      <Form.Input
        name="description"
        label="Описание"
        placeholder="Описание"
        value={values.description}
        error={errors.description}
        onChange={handleChange}
        required
      />
      <AccountSelectField
        value={values.sourceAccountId}
        onChange={(value) => setFieldValue('sourceAccountId', value)}
        name="sourceAccountId"
        label="Источник"
        placeholder="Выберите счет с которого взять деньги"
      />
      <Form.Input
        name="sourceAmount"
        label="Сума снятия"
        placeholder="Сумма снятия в валюте источника"
        value={values.sourceAmount}
        error={errors.sourceAmount}
        onChange={handleChange}
        required
      />
      <AccountSelectField
        value={values.targetAccountId}
        onChange={(value) => setFieldValue('targetAccountId', value)}
        name="targetAccountId"
        label="Назначение"
        placeholder="Выберите счет куда положить деньги"
      />
      <Form.Input
        name="targetAmount"
        label="Сумма зачисления"
        placeholder="Сумма зачисления в валюте источника"
        value={values.targetAmount}
        error={errors.targetAmount}
        onChange={handleChange}
        required
      />
    </Form>
  );
};

export default TransferForm;
