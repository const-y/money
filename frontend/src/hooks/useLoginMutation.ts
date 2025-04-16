import { login } from '@/api/auth';
import { useMutation } from 'react-query';

const useLoginMutation = () => {
  return useMutation(
    (data: { username: string; password: string }) =>
      login(data.username, data.password),
    {
      onSuccess: (data) => {
        console.log('Login successful, token:', data.accessToken);
      },
      onError: (error) => {
        console.error('Login error:', error);
      },
    }
  );
};

export default useLoginMutation;
