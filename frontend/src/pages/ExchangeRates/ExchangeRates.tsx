import { FC } from 'react';
import { useQuery } from 'react-query';
import { Header, Loader } from 'semantic-ui-react';

import { ExchangeRate, getExchangeRateList } from '@/api/exchangeRates';
import AppTable, { Column } from '@/components/AppTable';
import queries from '@/constants/queries';
import formatDate from '@/helpers/formatDate';
import { ExchangeRateFormValues } from './ExhangeRateForm';
import ModalAddForm from './ModalAddForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const ExchangeRates: FC = () => {
  const { data, isLoading } = useQuery(
    queries.EXCHANGE_RATES,
    getExchangeRateList
  );

  if (isLoading) {
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
      <Header as="h1">Курсы валют</Header>
      <ModalAddForm />
      {data && <AppTable columns={columns} data={data} />}
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
