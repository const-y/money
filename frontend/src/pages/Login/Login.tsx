import { FC, useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Stack,
  Notification,
  Center,
} from '@/components/ui';
import useLoginMutation from '@/hooks/useLoginMutation';
import { useAuthContext } from '@/context/Auth';
import { useNavigate } from 'react-router-dom';
import routes from '@/constants/routes';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useLoginMutation({
    onSuccess: ({ accessToken }) => {
      login(accessToken);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ username, password });
  };

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
          <TextInput
            label="Логин"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <Button onClick={handleSubmit} fullWidth loading={isLoading}>
            Войти
          </Button>
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
