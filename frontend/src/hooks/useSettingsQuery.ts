import { getSettings } from '@/api/settings';
import queries from '@/constants/queries';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

function useSettings() {
  const { data, isLoading } = useQuery(queries.SETTINGS, getSettings);

  const settingsMap = useMemo(
    () =>
      data?.reduce<Record<string, string>>((map, item) => {
        map[item.key] = item.value;

        return map;
      }, {}) || {},
    [data]
  );

  return { data: settingsMap, isLoading };
}

export default useSettings;
