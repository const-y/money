import { ReactNode } from 'react';
import { Table } from 'semantic-ui-react';

import { Entity } from '@/api/api';
import { EmptyState } from './ui';

export interface RowOptions {
  positive?: boolean;
  negative?: boolean;
}

export type Column<T> = {
  key: string;
  title: ReactNode;
  collapsing?: boolean;
  renderCell: (row: T) => ReactNode;
};

type AppTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  getRowOptions?: (row: T) => RowOptions;
  renderEmptyState?: () => ReactNode;
};

export default function AppTable<T extends Entity>({
  columns,
  data,
  getRowOptions,
  renderEmptyState,
}: Readonly<AppTableProps<T>>) {
  if (!data.length) {
    return renderEmptyState ? renderEmptyState() : <EmptyState />;
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.HeaderCell key={column.key}>{column.title}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((row) => (
          <Table.Row key={row.id} {...getRowOptions?.(row)}>
            {columns.map((column) => (
              <Table.Cell key={column.key} collapsing={column.collapsing}>
                {column.renderCell(row)}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
