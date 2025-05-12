import assertIsDate from '@/helpers/assertIsDate';
import { DatePickerInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { FC } from 'react';

interface DatePickerProps {
  value: Date | null;
  error?: string;
  label?: string;
  required?: boolean;
  onChange: (value: Date) => void;
}

const DATE_FORMAT = 'YYYY-MM-DD';
const LOCALE = 'ru-RU';

const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  error,
  label = 'Выберите дату',
  required,
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
    />
  );
};

export default DatePicker;
