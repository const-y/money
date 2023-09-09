import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormId } from '@/context/FormId';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Form } from 'semantic-ui-react';
import * as Yup from 'yup';

export interface CategoryFormValues {
  name: string;
  isExpense: boolean;
}

interface ExchangeRateFormProps {
  initialValues: CategoryFormValues;
  onSubmit: (values: CategoryFormValues) => void;
}

const TransferSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
});

const ExchangeRateForm: FC<ExchangeRateFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const formId = useFormId();

  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<CategoryFormValues>({
      initialValues,
      validationSchema: TransferSchema,
      onSubmit,
    });

  const getError = (fieldName: keyof CategoryFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        label="Название"
        placeholder="Название"
        value={values.name}
        error={getError('name')}
        onChange={handleChange}
        required
      />
      <Form.Checkbox
        name="isExpense"
        id="isExpense"
        label="Это расход"
        checked={values.isExpense}
        onChange={handleChange}
      />
    </Form>
  );
};

export default ExchangeRateForm;
