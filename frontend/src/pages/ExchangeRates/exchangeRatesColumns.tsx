import { ExchangeRate } from '@/api/exchangeRates';
import { Column } from '@/components/AppTable';
import formatDate from '@/helpers/formatDate';
import { ExchangeRateFormValues } from './ExhangeRateForm';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';

const exchangeRatesColumns: Column<ExchangeRate>[] = [
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

function getInitialValues(exchangeRate: ExchangeRate): ExchangeRateFormValues {
  const { date, ...rest } = exchangeRate;

  return {
    date: new Date(date),
    ...rest,
  };
}

export default exchangeRatesColumns;
