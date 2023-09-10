import CategorySelectField from '@/components/CategorySelectField';
import Datepicker from '@/components/Datepicker';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormik } from 'formik';
import { FC } from 'react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { Form } from 'semantic-ui-react';
import * as Yup from 'yup';

export interface OperationFormValues {
  amount: number;
  date: Date | null;
  description: string;
  categoryId: number | null;
  counterpartyId: number;
}

interface OperationFormProps {
  id: string;
  initialValues: OperationFormValues;
  onSubmit: (values: OperationFormValues) => void;
}

const OperationSchema = Yup.object().shape({
  amount: Yup.number()
    .required(REQUIRED_FIELD_ERROR_MESSAGE)
    .test(
      'not-zero',
      'Значение не должно быть равно 0',
      (value) => value !== 0
    ),

  date: Yup.date().required(REQUIRED_FIELD_ERROR_MESSAGE),
  description: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
  categoryId: Yup.number().required(REQUIRED_FIELD_ERROR_MESSAGE),
  counterpartyId: Yup.number(),
});

const OperationForm: FC<OperationFormProps> = ({
  initialValues,
  onSubmit,
  id,
}) => {
  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<OperationFormValues>({
      initialValues,
      validationSchema: OperationSchema,
      onSubmit,
    });

  const getError = (fieldName: keyof OperationFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  const handleDateChange = (value: Date) => setFieldValue('date', value);

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <Datepicker
        value={values.date}
        onChange={handleDateChange}
        error={getError('date')}
        required
      />
      <Form.Input
        name="amount"
        label="Сумма"
        placeholder="Сумма"
        value={values.amount}
        error={getError('amount')}
        onChange={handleChange}
        required
      />
      <Form.Input
        name="description"
        label="Описание"
        placeholder="Описание"
        value={values.description}
        error={getError('description')}
        onChange={handleChange}
        required
      />
      <CategorySelectField
        value={values.categoryId}
        onChange={(categoryId) => setFieldValue('categoryId', categoryId)}
        error={getError('categoryId')}
      />
    </Form>
  );
};

export default OperationForm;
