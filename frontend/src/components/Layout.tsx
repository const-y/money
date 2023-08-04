import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import AppMenu from './AppMenu';
import Footer from './Footer';

const Layout: FC = () => (
  <div>
    <AppMenu />
    <Container style={{ marginTop: '7em', minHeight: '30rem' }}>
      <Outlet />
    </Container>
    <Footer />
  </div>
);

export default Layout;
