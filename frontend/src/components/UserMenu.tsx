import { Avatar, Group, Menu, Text, UnstyledButton } from '@/components/ui';
import routes from '@/constants/routes';
import { useAuthContext } from '@/context/Auth';
import useLogoutMutation from '@/hooks/useLogoutMutation';
import useMeQuery from '@/hooks/useMeQuery';
import { Box, Loader } from '@mantine/core';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserMeu = () => {
  const { logout } = useAuthContext();

  const { data: user, isLoading } = useMeQuery();
  const navigate = useNavigate();
  const avatarSrc = `https://i.pravatar.cc/40?u=${user?.username}}`;

  const { mutate: logoutMutate } = useLogoutMutation({
    onSuccess: () => {
      logout();
      navigate(routes.LOGIN);
    },
  });

  return { user, isLoading, avatarSrc, logout: logoutMutate };
};

const UserMenu: FC = () => {
  const { user, isLoading, avatarSrc, logout } = useUserMeu();

  if (isLoading || !user) {
    return <Loader size="xs" />;
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <Group gap="xs">
            <Avatar src={avatarSrc} alt={user.username} radius="xl" />
            <Box>
              <Text size="sm" fw={500} c="white">
                {user.username}
              </Text>
              <Text size="xs" c="dimmed">
                {user.email}
              </Text>
            </Box>
            <IconChevronDown size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={16} />}
          onClick={() => logout()}
        >
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
