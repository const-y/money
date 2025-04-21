import { Avatar, Group, Text } from '@/components/ui';
import useMeQuery from '@/hooks/useMeQuery';
import { Box, Loader } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { FC } from 'react';

const UserInfo: FC = () => {
  const { data: user, isLoading } = useMeQuery();
  const avatarSrc = `https://i.pravatar.cc/40?u=${user?.username}}`;

  if (isLoading || !user) {
    return <Loader size="xs" />;
  }

  return (
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
  );
};

export default UserInfo;
