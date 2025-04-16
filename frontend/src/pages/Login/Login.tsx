import { FC, useState } from 'react';
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

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // важно: для куки
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Ошибка авторизации');
      }

      setAccessToken(data.access_token);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Неизвестная ошибка');
    }
  };

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
          <Button onClick={handleLogin} fullWidth>
            Войти
          </Button>
        </Stack>

        {error && (
          <Notification color="red" mt="md">
            {error}
          </Notification>
        )}
        {accessToken && (
          <Notification color="teal" mt="md">
            Успешно! Токен: {accessToken.slice(0, 16)}...
          </Notification>
        )}
      </Paper>
    </Center>
  );
};

export default Login;
