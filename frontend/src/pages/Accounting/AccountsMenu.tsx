import { getAccounts } from '@/api/accounts';
import queries from '@/constants/queries';
import formatCurrency from '@/helpers/formatCurrency';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Header, Label, Loader, Menu, MenuItemProps } from 'semantic-ui-react';

interface AccountsMenuProps {
  activeAccountId: number;
  onItemClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    data: MenuItemProps
  ) => void;
}

const AccountsMenu: FC<AccountsMenuProps> = ({
  activeAccountId,
  onItemClick,
}) => {
  const { data, isLoading } = useQuery(queries.ACCOUNTS, getAccounts);

  if (isLoading || !data) {
    return <Loader active />;
  }

  return (
    <Menu fluid vertical tabular>
      {data.map(({ id, name, balance, currency }) => {
        const isActive = activeAccountId === id;
        return (
          <Menu.Item
            key={id}
            index={id}
            active={isActive}
            onClick={onItemClick}
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
