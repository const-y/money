import { FC, MouseEvent, useState } from 'react';
import { Grid, Header, MenuItemProps, Segment } from 'semantic-ui-react';
import AccountsMenu from './AccountsMenu';
import ModalAddOperation from './ModalAddOperation';
import OperationsTable from './OperationsTable';

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
