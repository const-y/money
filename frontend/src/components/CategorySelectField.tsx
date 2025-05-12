import { Category, getCategoryList } from '@/api/categories';
import { Select, SelectOption } from '@/components/ui';
import queries from '@/constants/queries';
import assertIsString from '@/helpers/assertIsString';
import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';

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
  const { data } = useQuery(queries.CATEGORIES, getCategoryList);

  const options: SelectOption[] = useMemo(
    () => getOptions(data, operationType),
    [data, operationType]
  );

  const handleChange = (selectValue: string | null) => {
    assertIsString(selectValue);
    onChange(Number(selectValue));
  };

  return (
    <Select
      data={options}
      name="categoryId"
      label="Категория"
      placeholder="Категория"
      value={String(value)}
      error={error}
      onChange={handleChange}
      required
      searchable
    />
  );
};

function getOptions(
  data: Category[] | undefined,
  operationType: OperationType
): SelectOption[] {
  if (!data) return [];

  return data
    .filter((item) => {
      if (operationType === 'EXPENSE') return item.isExpense;
      return !item.isExpense;
    })
    .map(({ id, name }) => ({ value: String(id), label: name }));
}

export default CategorySelectField;
