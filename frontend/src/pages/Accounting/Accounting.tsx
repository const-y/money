import { FC, MouseEvent, useState } from 'react';
import { Grid, Header, MenuItemProps, Segment } from 'semantic-ui-react';
import AccountsMenu from './components/AccountsMenu';
import ModalAddOperation from './components/ModalAddOperation';
import OperationsTable from './components/OperationsTable';
import ModalTransfer from './components/ModalTransfer';
import ModalChangeAmount from './components/ModalChangeAmount';

const Accounting: FC = () => {
  const [activeAccountId, setActiveAccountId] = useState(0);

  const handleItemClick = (
    _event: MouseEvent<HTMLAnchorElement>,
    { index }: MenuItemProps
  ) => {
    if (typeof index === 'number') setActiveAccountId(index);
  };

  return (
    <>
      <Header as="h1">Учет</Header>
      <Grid>
        <Grid.Column width={4}>
          <AccountsMenu
            activeAccountId={activeAccountId}
            onItemClick={handleItemClick}
          />
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {activeAccountId ? (
            <div>
              <ModalAddOperation accountId={activeAccountId} />
              <ModalTransfer sourceAccountId={activeAccountId} />
              <ModalChangeAmount accountId={activeAccountId} />
              <OperationsTable accountId={activeAccountId} />
            </div>
          ) : (
            <Segment>Выберите счет</Segment>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Accounting;
