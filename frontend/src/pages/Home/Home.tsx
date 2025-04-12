import settingKeys from '@/constants/settingKeys';
import useSettings from '@/hooks/useSettings';
import { Badge } from '@mantine/core';
import { FC } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import CapitalWidget from './CapitalWidget';

const Home: FC = () => {
  const { data: settings, isLoading } = useSettings();

  const baseCurrency = settings[settingKeys.BASE_CURRENCY_KEY];

  return (
    <>
      <CapitalWidget />
      <Segment loading={isLoading}>
        <Header as="h3">Примененные настройки</Header>
        <Badge> {`Базовая валюта: ${baseCurrency}`}</Badge>
      </Segment>
    </>
  );
};

export default Home;
