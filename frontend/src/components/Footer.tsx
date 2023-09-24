import { FC } from 'react';
import { Container, List, Segment } from 'semantic-ui-react';

const Footer: FC = () => (
  <Segment inverted vertical style={{ marginTop: '5rem' }}>
    <Container textAlign="center">
      <List horizontal inverted divided link size="small">
        <List.Item
          as="a"
          href="https://github.com/const-y/money"
          target="_blank"
        >
          <List.Icon name="github" style={{ marginRight: '4px' }} />
          GitHub
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
