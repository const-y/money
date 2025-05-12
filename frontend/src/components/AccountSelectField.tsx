import { Select, SelectOption } from '@/components/ui';
import assertIsString from '@/helpers/assertIsString';
import getDropdownOptions from '@/helpers/getDropdownOptions';
import useAccountsQuery from '@/hooks/useAccountsQuery';
import { FC, useMemo } from 'react';

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
  const { data } = useAccountsQuery();

  const options: SelectOption[] = useMemo(
    () => getDropdownOptions(data, (account) => account.name),
    [data]
  );

  const handleChange = (selectValue: string | null) => {
    assertIsString(selectValue);
    onChange(Number(selectValue));
  };

  return (
    <Select
      data={options}
      label={label}
      placeholder={placeholder}
      value={String(value)}
      error={error}
      onChange={handleChange}
      searchable
      withAsterisk
    />
  );
};

export default AccountSelectField;
