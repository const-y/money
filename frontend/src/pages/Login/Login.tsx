import { Center, Notification, Paper, Title } from '@/components/ui';
import routes from '@/constants/routes';
import { useAuthContext } from '@/context/Auth';
import useLoginMutation from '@/hooks/useLoginMutation';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login: FC = () => {
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useLoginMutation({
    onSuccess: ({ accessToken }) => {
      login(accessToken);
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.HOME);
    }
  }, [isAuthenticated]);

  return (
    <Center h={'100vh'}>
      <Paper radius="md" p="xl" withBorder w={400}>
        <Title order={2} ta="center" mb="md">
          Вход в систему
        </Title>
        <LoginForm onSubmit={mutate} isLoading={isLoading} />
        {isError && (
          <Notification color="red" mt="md">
            {(error as any)?.message || 'Ошибка авторизации'}
          </Notification>
        )}
      </Paper>
    </Center>
  );
};

export default Login;
