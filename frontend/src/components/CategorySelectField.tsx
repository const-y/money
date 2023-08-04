import { getCategoryList } from '@/api/categories';
import queries from '@/constants/queries';
import { FC, SyntheticEvent, useMemo } from 'react';
import { useQuery } from 'react-query';
import { DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react';

interface CategorySelectFieldProps {
  value: number | null;
  error?: string;
  onChange: (value: number) => void;
}

const CategorySelectField: FC<CategorySelectFieldProps> = ({
  value,
  error,
  onChange,
}) => {
  const { data, isLoading } = useQuery(queries.CATEGORIES, getCategoryList);

  const options: DropdownItemProps[] = useMemo(
    () =>
      data?.map(({ id, name }) => ({ key: id, value: id, text: name })) || [],
    [data]
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
    />
  );
};

export default CategorySelectField;
