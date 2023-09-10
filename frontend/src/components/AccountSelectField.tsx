import { Account, getAccounts } from '@/api/accounts';
import queries from '@/constants/queries';
import assertIsNumber from '@/helpers/assertIsNumber';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react';

interface AccountSelectFieldProps {
  value: number | null;
  error?: string;
  onChange: (value: number) => void;
  label: string;
  placeholder: string;
}

const AccountSelectField: FC<AccountSelectFieldProps> = ({
  value,
  error,
  label,
  placeholder,
  onChange,
}) => {
  const { data, isLoading } = useQuery(queries.ACCOUNTS, getAccounts);

  const options: DropdownItemProps[] = useMemo(
    () => getDropdownOptions(data),
    [data]
  );

  const handleChange = (_event: any, { value }: DropdownProps) => {
    assertIsNumber(value);
    onChange(value);
  };

  return (
    <Form.Select
      options={options}
      label={label}
      placeholder={placeholder}
      value={value || 0}
      error={error}
      onChange={handleChange}
      required
      loading={isLoading}
      search
    />
  );
};

function getDropdownOptions(data: Account[] | undefined): DropdownItemProps[] {
  if (!data) return [];

  return data.map(({ id, name }) => ({ key: id, value: id, text: name }));
}

export default AccountSelectField;
