import { login } from '@/api/auth';
import { useMutation } from 'react-query';

interface UseLoginMutationOptions {
  onSuccess?: ({ accessToken }: { accessToken: string }) => void;
  onError?: () => void;
}

const useLoginMutation = (options?: UseLoginMutationOptions) => {
  return useMutation(
    (data: { username: string; password: string }) =>
      login(data.username, data.password),
    options
  );
};

export default useLoginMutation;
