import { useFormik } from 'formik';
import { FC, SyntheticEvent, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownProps, Form } from 'semantic-ui-react';

import { getAccountTypes } from '@/api/accountTypes';
import queries from '@/constants/queries';
import { useFormId } from '@/context/FormId';

export interface AccountFormValues {
  name: string;
  currency: string;
  accountType: string | number;
}

interface AccountFormProps {
  initialValues: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
}

const AccountForm: FC<AccountFormProps> = ({ initialValues, onSubmit }) => {
  const formId = useFormId();
  const { data, isLoading } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);
  const { handleChange, values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<AccountFormValues>({
      initialValues,
      onSubmit,
      validate: (values) => (values.name ? {} : { name: 'Обязательное поле' }),
    });

  const getError = (fieldName: keyof AccountFormValues) =>
    touched[fieldName] ? errors[fieldName] : undefined;

  const accountTypeOptions = useMemo(
    () =>
      data?.map(({ id, title }) => ({
        key: id,
        value: id,
        text: title,
      })) || [],
    [data]
  );

  const handleSelectAccountTypeChange = (
    _event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldValue('accountType', data.value);
  };

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        label="Название"
        placeholder="Название"
        value={values.name}
        error={getError('name')}
        onChange={handleChange}
      />
      <Form.Input
        name="currency"
        label="Валюта"
        placeholder="Валюта"
        value={values.currency}
        error={getError('currency')}
        onChange={handleChange}
      />
      <Form.Select
        label="Тип счета"
        placeholder="Тип счета"
        value={values.accountType}
        error={getError('accountType')}
        onChange={handleSelectAccountTypeChange}
        options={accountTypeOptions}
        loading={isLoading}
        search
      />
    </Form>
  );
};

export default AccountForm;
