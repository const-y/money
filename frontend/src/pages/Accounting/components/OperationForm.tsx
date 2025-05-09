import CategorySelectField from '@/components/CategorySelectField';
import { DatePicker } from '@/components/ui';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormId } from '@/context/FormId';
import { useFormik } from 'formik';
import { FC } from 'react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { Form } from 'semantic-ui-react';
import * as Yup from 'yup';
import OperationTypeRadioGroup from './OperationTypeRadioGroup';

export interface OperationFormValues {
  amount: number;
  date: Date | null;
  description: string;
  categoryId: number | null;
  counterpartyId: number;
  isExpense: boolean;
}

interface OperationFormProps {
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

const OperationForm: FC<OperationFormProps> = ({ initialValues, onSubmit }) => {
  const formId = useFormId();
  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<OperationFormValues>({
      initialValues,
      validationSchema: OperationSchema,
      onSubmit,
    });

  const getError = (fieldName: keyof OperationFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  const handleDateChange = (value: Date) => setFieldValue('date', value);

  const handleCategorySelectFieldChange = (categoryId: number) =>
    setFieldValue('categoryId', categoryId);

  const handleOperationTypeRadioGroupChange = (isExpense: boolean) => {
    setFieldValue('isExpense', isExpense);
    setFieldValue('categoryId', initialValues.categoryId);
  };

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <DatePicker
        value={values.date}
        onChange={handleDateChange}
        error={getError('date')}
        required
        hasMargins
      />
      <OperationTypeRadioGroup
        isExpense={values.isExpense}
        onChange={handleOperationTypeRadioGroupChange}
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
        onChange={handleCategorySelectFieldChange}
        error={getError('categoryId')}
        operationType={values.isExpense ? 'EXPENSE' : 'INCOME'}
      />
    </Form>
  );
};

export default OperationForm;
