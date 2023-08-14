import { getAccounts } from '@/api/accounts';
import queries from '@/constants/queries';
import { FC, SyntheticEvent, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react';

interface AccountSelectFieldProps {
  value: number | null;
  error?: string;
  onChange: (value: number) => void;
  name: string;
  label: string;
  placeholder: string;
}

const AccountSelectField: FC<AccountSelectFieldProps> = ({
  value,
  error,
  name,
  label,
  placeholder,
  onChange,
}) => {
  const { data, isLoading } = useQuery(queries.ACCOUNTS, getAccounts);

  const options: DropdownItemProps[] = useMemo(
    () =>
      data?.map(({ id, name }) => ({ key: id, value: id, text: name })) || [],
    [data]
  );

  const handleChange = (
    _event: SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    if (typeof value !== 'number') {
      throw Error('Значение должно быть number');
    }
    onChange(value);
  };

  return (
    <Form.Select
      options={options}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value || 0}
      error={error}
      onChange={handleChange}
      required
      loading={isLoading}
    />
  );
};

export default AccountSelectField;
