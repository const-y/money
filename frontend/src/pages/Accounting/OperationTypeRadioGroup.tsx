import { FC } from 'react';
import { Form, Radio } from 'semantic-ui-react';

interface OperationTypeRadioGroupProps {
  isExpense: boolean;
  onChange: (isExpense: boolean) => void;
}

const NAME = 'OPERATION_TYPE_GROUP';
const EXPENSE = 'EXPENSE';
const INCOME = 'INCOME';

const OperationTypeRadioGroup: FC<OperationTypeRadioGroupProps> = ({
  isExpense,
  onChange,
}) => {
  const handleChange = (
    _event: any,
    { value }: { value?: string | number }
  ) => {
    const checked = value === EXPENSE;

    return onChange(checked);
  };

  return (
    <>
      <Form.Field>
        <Radio
          label="Расход"
          name={NAME}
          value={EXPENSE}
          checked={isExpense}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label="Доход"
          name={NAME}
          value={INCOME}
          checked={!isExpense}
          onChange={handleChange}
        />
      </Form.Field>
    </>
  );
};

export default OperationTypeRadioGroup;
