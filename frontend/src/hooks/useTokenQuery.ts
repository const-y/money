import { getToken } from '@/api/auth';
import { useQuery } from 'react-query';

export const useTokenQuery = () => {
  return useQuery('token', getToken, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
