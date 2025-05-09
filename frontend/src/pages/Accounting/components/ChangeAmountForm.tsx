import { DatePicker, TextInput } from '@/components/ui';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

export interface ChangeAmountFormValues {
  date: Date | null;
  newAmount: number;
}

interface ChangeAmountFormProps {
  id: string;
  initialValues: ChangeAmountFormValues;
  onSubmit: (values: ChangeAmountFormValues) => void;
}

const validateAmount = Yup.number()
  .required(REQUIRED_FIELD_ERROR_MESSAGE)
  .test('not-zero', 'Значение не должно быть равно 0', (value) => value !== 0);

const ChangeAmountSchema = Yup.object().shape({
  date: Yup.date().required(REQUIRED_FIELD_ERROR_MESSAGE),
  newAmount: validateAmount,
});

const ChangeAmountForm: FC<ChangeAmountFormProps> = ({
  initialValues,
  onSubmit,
  id,
}) => {
  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<ChangeAmountFormValues>({
      initialValues,
      validationSchema: ChangeAmountSchema,
      onSubmit,
    });

  const handleDateChange = (date: Date) => {
    setFieldValue('date', date);
  };

  const getError = (fieldName: keyof ChangeAmountFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <form id={id} onSubmit={handleSubmit}>
      <DatePicker
        value={values.date}
        onChange={handleDateChange}
        label="Выберите дату"
        required
        error={getError('date')}
        hasMargins
      />
      <TextInput
        name="newAmount"
        label="Новый остаток"
        placeholder="Новый остаток"
        value={values.newAmount}
        error={getError('newAmount')}
        onChange={handleChange}
        withAsterisk
      />
    </form>
  );
};

export default ChangeAmountForm;
