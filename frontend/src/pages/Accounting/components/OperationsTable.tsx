import AppTable from '@/components/AppTable';
import useOperationsQuery from '@/hooks/useOperationsQuery';
import { FC } from 'react';
import { Loader } from 'semantic-ui-react';
import operationsTableColumns from './operationsTableColumns';

interface OperationsTableProps {
  accountId: number;
}

const OperationsTable: FC<OperationsTableProps> = ({ accountId }) => {
  const { data, isLoading } = useOperationsQuery(accountId);

  if (isLoading || !data) {
    return <Loader active />;
  }

  return <AppTable columns={operationsTableColumns} data={data} />;
};

export default OperationsTable;
