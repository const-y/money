import formatCurrency from '@/helpers/formatCurrency';
import useAccountsQuery from '@/hooks/useAccountsQuery';
import { FC, MouseEvent } from 'react';
import { Label, Loader, Menu, MenuItemProps } from 'semantic-ui-react';
import { useActiveAccount } from '../ActiveAccountContext';

const AccountsMenu: FC = () => {
  const { data, isLoading } = useAccountsQuery();
  const { activeAccountId, setActiveAccountId } = useActiveAccount();

  if (isLoading || !data) {
    return <Loader active />;
  }

  const handleItemClick = (
    _event: MouseEvent<HTMLAnchorElement>,
    { index }: MenuItemProps
  ) => {
    if (typeof index === 'number') setActiveAccountId(index);
  };

  return (
    <Menu fluid vertical tabular style={{ height: '100%' }}>
      {data.map(({ id, name, balance, currency }) => {
        const isActive = activeAccountId === id;
        return (
          <Menu.Item
            key={id}
            index={id}
            active={isActive}
            onClick={handleItemClick}
          >
            <Label color={isActive ? 'teal' : undefined}>
              {formatCurrency(balance, currency)}
            </Label>
            {name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default AccountsMenu;
