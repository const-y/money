import { Box, Group } from '@/components/ui';
import { FC } from 'react';
import { useActiveAccount } from '../ActiveAccountContext';
import AccountingModals from './AccountingModals';
import AccountsMenu from './AccountsMenu';
import OperationsTable from './OperationsTable';

const AccountingGrid: FC = () => {
  const { activeAccountId } = useActiveAccount();

  return (
    <Group align="top" h="100%">
      <Box w="300px">
        <AccountsMenu />
      </Box>
      <Box flex={1}>
        <AccountingModals />
        {activeAccountId && <OperationsTable accountId={activeAccountId} />}
      </Box>
    </Group>
  );
};

export default AccountingGrid;
