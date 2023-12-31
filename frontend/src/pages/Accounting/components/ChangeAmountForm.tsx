import AccountSelectField from '@/components/AccountSelectField';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormik } from 'formik';
import { FC } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { SemanticDatepickerProps } from 'react-semantic-ui-datepickers/dist/types';
import { Form } from 'semantic-ui-react';
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

  const handleDateChange = (
    _event: React.SyntheticEvent<Element, Event> | undefined,
    data: SemanticDatepickerProps
  ) => {
    setFieldValue('date', data.value);
  };

  const getError = (fieldName: keyof ChangeAmountFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <SemanticDatepicker
        name="date"
        value={values.date}
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        label="Выберите дату"
        required
        error={getError('date')}
      />
      <Form.Input
        name="newAmount"
        label="Новый остаток"
        placeholder="Новый остаток"
        value={values.newAmount}
        error={getError('newAmount')}
        onChange={handleChange}
        required
      />
    </Form>
  );
};

export default ChangeAmountForm;
