import { Avatar, Group, Menu, Text, UnstyledButton } from '@/components/ui';
import routes from '@/constants/routes';
import { useAuthContext } from '@/context/Auth';
import useMeQuery from '@/hooks/useMeQuery';
import { Loader } from '@mantine/core';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenu: FC = () => {
  const { logout } = useAuthContext();
  const { data: user, isLoading } = useMeQuery();
  const navigate = useNavigate();
  const avatarSrc = 'https://i.pravatar.cc/40';

  if (isLoading || !user) {
    return <Loader size="xs" />;
  }

  const handleLogout = () => {
    logout();
    navigate(routes.LOGIN);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <Group gap="xs">
            <Avatar src={avatarSrc} alt={user.username} radius="xl" />
            <div style={{ lineHeight: 1 }}>
              <Text size="sm" fw={500}>
                {user.username}
              </Text>
              <Text size="xs" c="dimmed">
                {user.email}
              </Text>
            </div>
            <IconChevronDown size={16} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}
        >
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
