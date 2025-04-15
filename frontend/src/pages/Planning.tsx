import { EmptyState, PageTitle } from '@/components/ui';
import { FC } from 'react';

const Planning: FC = () => (
  <>
    <PageTitle>Планирование</PageTitle>
    <EmptyState
      title="Нет данных"
      description="Похоже, здесь пока ничего нет."
    />
  </>
);

export default Planning;
