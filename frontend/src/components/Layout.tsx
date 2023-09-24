import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import AppMenu from './AppMenu';
import Footer from './Footer';

const Layout: FC = () => (
  <div>
    <AppMenu />
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container style={{ paddingTop: '7em', flex: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  </div>
);

export default Layout;
