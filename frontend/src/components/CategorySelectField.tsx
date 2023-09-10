import { getCategoryList } from '@/api/categories';
import queries from '@/constants/queries';
import { FC, SyntheticEvent, useMemo } from 'react';
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
    () =>
      data
        ?.filter((item) => {
          if (operationType === 'EXPENSE') return item.isExpense;
          return !item.isExpense;
        })
        .map(({ id, name }) => ({ key: id, value: id, text: name })) || [],
    [data, operationType]
  );

  const handleChange = (
    _event: SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => {
    if (typeof value !== 'number') {
      throw Error('Значение должно быть number');
    }
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

export default CategorySelectField;
