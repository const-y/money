import { useFormik } from 'formik';
import { FC } from 'react';
import { Form } from 'semantic-ui-react';

export interface AccountTypeFormValues {
  title: string;
}

interface AccountTypeFormProps {
  id: string;
  initialValues: AccountTypeFormValues;
  onSubmit: (values: AccountTypeFormValues) => void;
}

const AccountTypeForm: FC<AccountTypeFormProps> = ({
  initialValues,
  onSubmit,
  id,
}) => {
  const { handleChange, values, errors, handleSubmit } =
    useFormik<AccountTypeFormValues>({
      initialValues,
      onSubmit,
      validate: (values) =>
        values.title ? {} : { title: 'Обязательное поле' },
    });

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <Form.Input
        name="title"
        label="Название"
        placeholder="Название"
        value={values.title}
        error={errors.title}
        onChange={handleChange}
      />
    </Form>
  );
};

export default AccountTypeForm;
