export function getDropdownOptions<T extends { id: number }>(
  data: T[] | undefined,
  getOptionText: (item: T) => string
) {
  if (!data) return [];

  return data.map((item) => ({
    key: item.id,
    value: item.id,
    text: getOptionText(item),
  }));
}

export default getDropdownOptions;
