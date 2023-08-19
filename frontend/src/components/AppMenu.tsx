import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';

import routes from '@/constants/routes';

const AppMenu: FC = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as={Link} header to={routes.HOME}>
        <Image
          size="mini"
          src="/icons8-money-bag-40.png"
          style={{ marginRight: '1.5em' }}
        />
        Money
      </Menu.Item>
      <Menu.Item as={Link} to={routes.ACCOUNTING}>
        Учет
      </Menu.Item>
      <Menu.Item as={Link} to={routes.PLANNING}>
        Планирование
      </Menu.Item>
      <Dropdown item simple text="Справочники">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={routes.ACCOUNT_TYPES}>
            Типы счетов
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.ACCOUNTS}>
            Счета
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={routes.EXCHANGE_RATES}>
            Курсы валют
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>
);

export default AppMenu;
