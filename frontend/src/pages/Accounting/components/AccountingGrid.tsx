import { FC } from 'react';
import { Grid } from 'semantic-ui-react';
import { useActiveAccount } from '../ActiveAccountContext';
import AccountingModals from './AccountingModals';
import AccountsMenu from './AccountsMenu';
import OperationsTable from './OperationsTable';

const AccountingGrid: FC = () => {
  const { activeAccountId } = useActiveAccount();

  return (
    <Grid>
      <Grid.Column width={4}>
        <AccountsMenu />
      </Grid.Column>

      <Grid.Column stretched width={12}>
        <AccountingModals />
        {activeAccountId && <OperationsTable accountId={activeAccountId} />}
      </Grid.Column>
    </Grid>
  );
};

export default AccountingGrid;
