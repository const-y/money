import { getAccounts } from '@/api/accounts';
import queries from '@/constants/queries';
import assertIsNumber from '@/helpers/assertIsNumber';
import getDropdownOptions from '@/helpers/getDropdownOptions';
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
    () => getDropdownOptions(data, (account) => account.name),
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

export default AccountSelectField;
