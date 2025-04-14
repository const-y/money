import { getAccounts } from '@/api/accounts';
import queries from '@/constants/queries';
import formatCurrency from '@/helpers/formatCurrency';
import { FC, MouseEvent } from 'react';
import { useQuery } from 'react-query';
import { Label, Loader, Menu, MenuItemProps } from 'semantic-ui-react';
import { useActiveAccount } from '../ActiveAccountContext';

const AccountsMenu: FC = () => {
  const { data, isLoading } = useQuery(queries.ACCOUNTS, getAccounts);
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
    <Menu fluid vertical tabular>
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
