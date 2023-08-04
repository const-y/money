import { useFormik } from 'formik';
import { FC, SyntheticEvent, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownProps, Form } from 'semantic-ui-react';

import { getAccountTypes } from '@/api/accountTypes';
import queries from '@/constants/queries';

export interface AccountFormValues {
  name: string;
  currency: string;
  accountTypeId: string;
}

interface AccountFormProps {
  id: string;
  initialValues: AccountFormValues;
  onSubmit: (values: AccountFormValues) => void;
}

const AccountForm: FC<AccountFormProps> = ({ initialValues, onSubmit, id }) => {
  const { data, isLoading } = useQuery(queries.ACCOUNT_TYPES, getAccountTypes);
  const { handleChange, values, errors, handleSubmit, setFieldValue } =
    useFormik<AccountFormValues>({
      initialValues,
      onSubmit,
      validate: (values) => (values.name ? {} : { name: 'Обязательное поле' }),
    });

  const accountTypeOptions = useMemo(
    () =>
      data?.map(({ id, title }) => ({
        key: id,
        value: id,
        text: title,
      })) || [],
    [data]
  );

  const handleSelectAccountType = (
    _event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldValue('accountTypeId', data.value);
  };

  return (
    <Form id={id} onSubmit={handleSubmit}>
      <Form.Input
        name="name"
        label="Название"
        placeholder="Название"
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Form.Input
        name="currency"
        label="Валюта"
        placeholder="Валюта"
        value={values.currency}
        error={errors.currency}
        onChange={handleChange}
      />
      <Form.Select
        label="Тип счета"
        placeholder="Тип счета"
        value={values.accountTypeId}
        error={errors.accountTypeId}
        onChange={handleSelectAccountType}
        options={accountTypeOptions}
        loading={isLoading}
      />
    </Form>
  );
};

export default AccountForm;
