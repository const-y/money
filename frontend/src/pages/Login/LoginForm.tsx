import { Button, PasswordInput, TextInput } from '@/components/ui';
import { useForm, isNotEmpty } from '@mantine/form';
import { FC } from 'react';

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (values: LoginFormValues) => void;
}

const REQUIRED_FIELD_ERROR = 'Обязательное поле';

const LoginForm: FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const {
    getInputProps,
    onSubmit: handleSubmit,
    key,
  } = useForm<LoginFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: isNotEmpty(REQUIRED_FIELD_ERROR),
      password: isNotEmpty(REQUIRED_FIELD_ERROR),
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onSubmit(values))}>
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
  );
};

export default LoginForm;
