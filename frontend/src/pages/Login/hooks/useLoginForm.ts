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
import { isNotEmpty, useForm } from '@mantine/form';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  username: string;
  password: string;
}

const REQUIRED_FIELD_ERROR = 'Обязательное поле';

const useLoginForm = () => {
  return useForm<LoginFormValues>({
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
};

export default useLoginForm;
