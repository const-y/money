import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { FC } from 'react';

interface DateRangePickerProps {
  value: [Date | null, Date | null];
  error?: string;
  label?: string;
  required?: boolean;
  onChange: (value: [Date | null, Date | null]) => void;
}

const DATE_FORMAT = 'YYYY-MM-DD';
const LOCALE = 'ru-RU';

const DateRangePicker: FC<DateRangePickerProps> = ({
  value,
  onChange,
  error,
  label = 'Выберите период',
  required,
}) => {
  const handleChange = (value: DatesRangeValue) => {
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
      type="range"
    />
  );
};

export default DateRangePicker;
