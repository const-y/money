import { Title, Group } from '@mantine/core';
import { FC, ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  rightSlot?: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children, rightSlot }) => {
  return (
    <Group justify="space-between" align="center" mb="md">
      <Title order={2}>{children}</Title>
      {rightSlot}
    </Group>
  );
};

export default PageTitle;
