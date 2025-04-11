import { getCapital } from '@/api/capital';
import queries from '@/constants/queries';
import settingKeys from '@/constants/settingKeys';
import formatCurrency from '@/helpers/formatCurrency';
import useSettings from '@/hooks/useSettings';
import { useQuery } from 'react-query';
import { Loader, Statistic } from 'semantic-ui-react';

const CapitalWidget = () => {
  const { data, isLoading } = useQuery(queries.CAPITAL, getCapital);
  const { data: settings, isLoading: isSettingsLoading } = useSettings();
  const capital = data?.capital;
  const baseCurrency = settings[settingKeys.BASE_CURRENCY_KEY];

  if (isLoading || isSettingsLoading) {
    return <Loader active inline />;
  }

  if (!baseCurrency) {
    return null;
  }

  const formattedCapital =
    typeof capital === 'number' ? formatCurrency(capital, baseCurrency) : '';

  return (
    <Statistic>
      <Statistic.Value>{formattedCapital}</Statistic.Value>
      <Statistic.Label>Мой капитал</Statistic.Label>
    </Statistic>
  );
};

export default CapitalWidget;
