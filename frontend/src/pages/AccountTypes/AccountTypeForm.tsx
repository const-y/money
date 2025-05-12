import { Stack, TextInput } from '@/components/ui';
import { useFormId } from '@/context/FormId';
import { useFormik } from 'formik';
import { FC } from 'react';

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
    <form id={formId} onSubmit={handleSubmit}>
      <Stack gap="sm">
        <TextInput
          name="title"
          label="Название"
          placeholder="Название"
          value={values.title}
          error={getError('title')}
          onChange={handleChange}
        />
      </Stack>
    </form>
  );
};

export default AccountTypeForm;
