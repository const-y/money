import { Group } from '@/components/ui';
import { FC } from 'react';
import { Segment } from 'semantic-ui-react';
import { useActiveAccount } from '../ActiveAccountContext';
import ModalAddOperation from './ModalAddOperation';
import ModalChangeAmount from './ModalChangeAmount';
import ModalTransfer from './ModalTransfer';

const AccountingModals: FC = () => {
  const { activeAccountId } = useActiveAccount();

  if (!activeAccountId) {
    return <Segment>Выберите счет</Segment>;
  }

  return (
    <Group>
      <ModalAddOperation accountId={activeAccountId} />
      <ModalTransfer sourceAccountId={activeAccountId} />
      <ModalChangeAmount accountId={activeAccountId} />
    </Group>
  );
};

export default AccountingModals;
