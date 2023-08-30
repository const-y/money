import { getOperationList } from '@/api/operations';
import formatDate from '@/helpers/formatDate';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { Loader, Table } from 'semantic-ui-react';
import AccountCurrencyAmount from './AccountCurrencyAmount';
import queries from '@/constants/queries';

interface OperationsTableProps {
  accountId: number;
}

const OperationsTable: FC<OperationsTableProps> = ({ accountId }) => {
  const { data, isLoading } = useQuery([queries.OPERATIONS, accountId], () =>
    getOperationList({ account: accountId })
  );

  if (isLoading || !data) {
    return <Loader active />;
  }

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Дата</Table.HeaderCell>
          <Table.HeaderCell>Описание</Table.HeaderCell>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.map((operation) => (
          <Table.Row key={operation.id}>
            <Table.Cell>{formatDate(operation.date)}</Table.Cell>
            <Table.Cell>{operation.description}</Table.Cell>
            <Table.Cell>
              <AccountCurrencyAmount accountId={accountId}>
                {operation.amount}
              </AccountCurrencyAmount>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default OperationsTable;
