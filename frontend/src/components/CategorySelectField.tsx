import { Category, getCategoryList } from '@/api/categories';
import queries from '@/constants/queries';
import assertIsNumber from '@/helpers/assertIsNumber';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react';

export type OperationType = 'INCOME' | 'EXPENSE';

interface CategorySelectFieldProps {
  value: number | null;
  error?: string;
  operationType: OperationType;
  onChange: (value: number) => void;
}

const CategorySelectField: FC<CategorySelectFieldProps> = ({
  value,
  error,
  operationType,
  onChange,
}) => {
  const { data, isLoading } = useQuery(queries.CATEGORIES, getCategoryList);

  const options: DropdownItemProps[] = useMemo(
    () => getOptions(data, operationType),
    [data, operationType]
  );

  const handleChange = (_event: any, { value }: DropdownProps) => {
    assertIsNumber(value);
    onChange(value);
  };

  return (
    <Form.Select
      options={options}
      name="categoryId"
      label="Категория"
      placeholder="Категория"
      value={value || 0}
      error={error}
      onChange={handleChange}
      required
      loading={isLoading}
      search
    />
  );
};

function getOptions(
  data: Category[] | undefined,
  operationType: OperationType
) {
  if (!data) return [];

  return data
    .filter((item) => {
      if (operationType === 'EXPENSE') return item.isExpense;
      return !item.isExpense;
    })
    .map(({ id, name }) => ({ key: id, value: id, text: name }));
}

export default CategorySelectField;
