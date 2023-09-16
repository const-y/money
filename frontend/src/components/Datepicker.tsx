import assertIsDate from '@/helpers/assertIsDate';
import { FC } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { SemanticDatepickerProps } from 'react-semantic-ui-datepickers/dist/types';

interface DatepickerProps {
  value: Date | null;
  error?: string;
  label?: string;
  required?: boolean;
  onChange: (value: Date) => void;
}

const DATE_FORMAT = 'YYYY-MM-DD';

const Datepicker: FC<DatepickerProps> = ({
  value,
  onChange,
  error,
  label,
  required,
}) => {
  const handleChange = (_event: any, data: SemanticDatepickerProps) => {
    assertIsDate(data.value);
    onChange(data.value);
  };

  return (
    <SemanticDatepicker
      value={value}
      onChange={handleChange}
      format={DATE_FORMAT}
      label={label}
      required={required}
      error={error}
    />
  );
};

Datepicker.defaultProps = {
  label: 'Выберите дату',
};

export default Datepicker;
