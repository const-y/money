import { getAccountTypes } from '@/api/accountTypes';
import { Select } from '@/components/ui';
import { REQUIRED_FIELD_ERROR_MESSAGE } from '@/constants/form';
import queries from '@/constants/queries';
import { useFormId } from '@/context/FormId';
import getDropdownOptions from '@/helpers/getDropdownOptions';
import { Stack, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownProps } from 'semantic-ui-react';
import * as Yup from 'yup';

export interface AccountFormValues {
  name: string;
  currency: string;
  accountType: string | number;
}

interface AccountFormProps {
  initialValues: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
}

const AccountSchema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
  currency: Yup.string().required(REQUIRED_FIELD_ERROR_MESSAGE),
  accountType: Yup.number().required(REQUIRED_FIELD_ERROR_MESSAGE),
});

const AccountForm: FC<AccountFormProps> = ({ initialValues, onSubmit }) => {
  const formId = useFormId();
  const { data } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);

  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<AccountFormValues>({
      initialValues,
      onSubmit,
      validationSchema: AccountSchema,
    });

  const getError = (fieldName: keyof AccountFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  const accountTypeOptions = useMemo(
    () => getDropdownOptions(data, (accountType) => accountType.title),
    [data]
  );

  const handleSelectAccountTypeChange = (_event: any, data: DropdownProps) => {
    setFieldValue('accountType', data.value);
  };

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
        <TextInput
          name="currency"
          label="Валюта"
          placeholder="Валюта"
          value={values.currency}
          error={getError('currency')}
          onChange={handleChange}
          withAsterisk
        />
        <Select
          label="Тип счета"
          placeholder="Тип счета"
          value={String(values.accountType)}
          error={getError('accountType')}
          onChange={handleSelectAccountTypeChange}
          data={accountTypeOptions}
          searchable
          withAsterisk
        />
      </Stack>
    </form>
  );
};

export default AccountForm;
