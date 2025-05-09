import assertIsDate from '@/helpers/assertIsDate';
import { DatePickerInput } from '@mantine/dates';
import { FC } from 'react';
import '@mantine/dates/styles.css';

interface DatePickerProps {
  value: Date | null;
  error?: string;
  label?: string;
  required?: boolean;
  onChange: (value: Date) => void;
  hasMargins?: boolean;
}

const DATE_FORMAT = 'YYYY-MM-DD';
const LOCALE = 'ru-RU';

const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  error,
  label,
  required,
  hasMargins,
}) => {
  const handleChange = (value: Date | null) => {
    assertIsDate(value);
    onChange(value);
  };

  return (
    <DatePickerInput
      value={value}
      onChange={handleChange}
      valueFormat={DATE_FORMAT}
      label={label}
      required={required}
      error={error}
      locale={LOCALE}
      my={hasMargins ? 'sm' : undefined}
    />
  );
};

DatePicker.defaultProps = {
  label: 'Выберите дату',
};

export default DatePicker;
