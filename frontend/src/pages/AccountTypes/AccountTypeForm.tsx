import { useFormId } from '@/context/FormId';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Form } from 'semantic-ui-react';

export interface AccountTypeFormValues {
  title: string;
}

interface AccountTypeFormProps {
  initialValues: AccountTypeFormValues;
  onSubmit: (values: AccountTypeFormValues) => void;
}

const AccountTypeForm: FC<AccountTypeFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const formId = useFormId();

  const { handleChange, values, errors, touched, handleSubmit } =
    useFormik<AccountTypeFormValues>({
      initialValues,
      onSubmit,
      validate: (values) =>
        values.title ? {} : { title: 'Обязательное поле' },
    });

  const getError = (fieldName: keyof AccountTypeFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        name="title"
        label="Название"
        placeholder="Название"
        value={values.title}
        error={getError('title')}
        onChange={handleChange}
      />
    </Form>
  );
};

export default AccountTypeForm;
