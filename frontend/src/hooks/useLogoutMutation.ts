import { logout } from '@/api/auth';
import { useMutation } from 'react-query';

interface UseLogoutMutationOptions {
  onSuccess?: () => void;
  onError?: () => void;
}

const useLogoutMutation = (options?: UseLogoutMutationOptions) => {
  return useMutation(logout, options);
};

export default useLogoutMutation;
