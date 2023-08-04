import settingKeys from '@/constants/settingKeys';
import useSettings from '@/hooks/useSettings';
import { FC } from 'react';
import { Header, Label, Segment } from 'semantic-ui-react';
import CapitalWidget from './CapitalWidget';

const Home: FC = () => {
  const { data: settings, isLoading } = useSettings();

  const baseCurrency = settings[settingKeys.BASE_CURRENCY_KEY];

  return (
    <>
      <CapitalWidget />
      <Segment loading={isLoading}>
        <Header as="h3">Примененные настройки</Header>
        <Label>
          Базовая валюта:
          <Label.Detail>{baseCurrency}</Label.Detail>
        </Label>
      </Segment>
    </>
  );
};

export default Home;
