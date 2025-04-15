import AppTable from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_EXCHANGE_RATE } from '@/constants/modalIds';
import { useModalState } from '@/context/ModalState';
import useExchangeRatesQuery from '@/hooks/useExchangeRatesQuery';
import { FC } from 'react';
import { Loader } from 'semantic-ui-react';
import ModalAddForm from './ModalAddForm';
import exchangeRatesColumns from './exchangeRatesColumns';

const ExchangeRates: FC = () => {
  const { data, isLoading } = useExchangeRatesQuery();

  const { open } = useModalState(MODAL_ADD_EXCHANGE_RATE);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Курсы валют</PageTitle>
      <AppTable
        columns={exchangeRatesColumns}
        data={data}
        renderEmptyState={() => (
          <EmptyState
            title="Еще не создано ни одного курса валюты"
            description="Курсы валют это информация о текущих курсах валют относительно базовой валюты"
            actionLabel="Добавить курс валюты"
            onActionClick={open}
          />
        )}
      />
    </>
  );
};

export default ExchangeRates;
