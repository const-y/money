import { SelectOption } from '@/components/ui';

export function getDropdownOptions<T extends { id: number }>(
  data: T[] | undefined,
  getOptionText: (item: T) => string
): SelectOption[] {
  if (!data) return [];

  return data.map((item) => ({
    value: String(item.id),
    label: getOptionText(item),
  }));
}

export default getDropdownOptions;
