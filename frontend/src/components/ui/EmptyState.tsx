import { Button, Center, Stack, Text } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';

interface EmptyTableStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

const EmptyState = ({
  title = 'Нет данных',
  description = 'Похоже, здесь пока ничего нет.',
  actionLabel,
  onActionClick,
}: EmptyTableStateProps) => {
  return (
    <Center h="100%" p="xl">
      <Stack gap="sm" align="center">
        <IconInbox size={48} stroke={1.5} color="gray" />
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text size="sm" c="dimmed" ta="center" maw={300}>
          {description}
        </Text>
        {actionLabel && onActionClick && (
          <Button variant="light" onClick={onActionClick}>
            {actionLabel}
          </Button>
        )}
      </Stack>
    </Center>
  );
};

export default EmptyState;
