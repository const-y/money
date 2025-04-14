import { ExchangeRate, getExchangeRateList } from '@/api/exchangeRates';
import AppTable, { Column } from '@/components/AppTable';
import { EmptyState, PageTitle } from '@/components/ui';
import { MODAL_ADD_EXCHANGE_RATE } from '@/constants/modalIds';
import queries from '@/constants/queries';
import { useModalState } from '@/context/ModalState';
import formatDate from '@/helpers/formatDate';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'semantic-ui-react';
import { ExchangeRateFormValues } from './ExhangeRateForm';
import ModalAddForm from './ModalAddForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const ExchangeRates: FC = () => {
  const { data, isLoading } = useQuery(
    queries.EXCHANGE_RATES,
    getExchangeRateList
  );

  const { open } = useModalState(MODAL_ADD_EXCHANGE_RATE);

  if (isLoading || !data) {
    return <Loader />;
  }

  const columns: Column<ExchangeRate>[] = [
    {
      key: 'actions',
      title: '',
      renderCell: (row) => (
        <div>
          <ModalDelete id={row.id} title={row.currency} />
          <ModalEdit
            exchangeRateId={row.id}
            initialValues={getInitialValues(row)}
          />
        </div>
      ),
      collapsing: true,
    },
    { key: 'date', title: 'Дата', renderCell: (row) => formatDate(row.date) },
    { key: 'currency', title: 'Валюта', renderCell: (row) => row.currency },
    {
      key: 'baseCurrency',
      title: 'Базовая валюта',
      renderCell: (row) => row.baseCurrency,
    },
    { key: 'rate', title: 'Курс', renderCell: (row) => row.rate },
  ];

  return (
    <>
      <PageTitle rightSlot={<ModalAddForm />}>Курсы валют</PageTitle>
      {data.length === 0 ? (
        <EmptyState
          title="Еще не создано ни одного курса валюты"
          description="Курсы валют это информация о текущих курсах валют относительно базовой валюты"
          actionLabel="Добавить курс валюты"
          onActionClick={open}
        />
      ) : (
        <AppTable columns={columns} data={data} />
      )}
    </>
  );
};

function getInitialValues(exchangeRate: ExchangeRate): ExchangeRateFormValues {
  const { date, ...rest } = exchangeRate;

  return {
    date: new Date(date),
    ...rest,
  };
}

export default ExchangeRates;
