import {
  Button,
  Center,
  Notification,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@/components/ui';
import routes from '@/constants/routes';
import { useAuthContext } from '@/context/Auth';
import useLoginMutation from '@/hooks/useLoginMutation';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLoginForm from './hooks/useLoginForm';

const Login: FC = () => {
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useLoginMutation({
    onSuccess: ({ accessToken }) => {
      login(accessToken);
    },
  });

  const { getInputProps, key, onSubmit } = useLoginForm();

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

        <Stack>
          <form onSubmit={onSubmit((values) => mutate(values))}>
            <TextInput
              my="sm"
              withAsterisk
              label="Логин"
              placeholder="Ваш логин"
              key={key('username')}
              {...getInputProps('username')}
            />
            <PasswordInput
              my="sm"
              withAsterisk
              label="Пароль"
              placeholder="Ваш пароль"
              key={key('password')}
              {...getInputProps('password')}
            />
            <Button mt="lg" type="submit" fullWidth loading={isLoading}>
              Войти
            </Button>
          </form>
        </Stack>

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
