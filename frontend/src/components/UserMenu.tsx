import { Menu, UnstyledButton } from '@/components/ui';
import routes from '@/constants/routes';
import { useAuthContext } from '@/context/Auth';
import useLogoutMutation from '@/hooks/useLogoutMutation';
import { IconLogout } from '@tabler/icons-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfo from './UserInfo';

const UserMenu: FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useLogoutMutation({
    onSuccess: () => {
      logout();
      navigate(routes.LOGIN);
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <UserInfo />
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
