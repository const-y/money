import { Checkbox, Stack, TextInput } from '@/components/ui';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import { useFormId } from '@/context/FormId';
import { useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

export interface CategoryFormValues {
  name: string;
  isExpense: boolean;
}

interface CategoryFormProps {
  initialValues: CategoryFormValues;
  onSubmit: (values: CategoryFormValues) => void;
}

const CategorySchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
});

const CategoryForm: FC<CategoryFormProps> = ({ initialValues, onSubmit }) => {
  const formId = useFormId();

  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<CategoryFormValues>({
      initialValues,
      validationSchema: CategorySchema,
      onSubmit,
    });

  const getError = (fieldName: keyof CategoryFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Stack gap="sm">
        <TextInput
          name="name"
          label="Название"
          placeholder="Название"
          value={values.name}
          error={getError('name')}
          onChange={handleChange}
          withAsterisk
        />
        <Checkbox
          name="isExpense"
          id="isExpense"
          label="Это расход"
          checked={values.isExpense}
          onChange={handleChange}
        />
      </Stack>
    </form>
  );
};

export default CategoryForm;
