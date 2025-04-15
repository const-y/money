import { Operation } from '@/api/operations';
import { Column } from '@/components/AppTable';
import formatDate from '@/helpers/formatDate';

const operationsTableColumns: Column<Operation>[] = [
  {
    key: 'date',
    title: 'Дата',
    renderCell: ({ date }) => formatDate(date),
  },
  {
    key: 'description',
    title: 'Описание',
    renderCell: ({ description }) => description,
  },
  {
    key: 'amount',
    title: 'Сумма',
    renderCell: ({ amount }) => amount,
  },
];

export default operationsTableColumns;
