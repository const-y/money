import { ReactNode } from 'react';
import { Table } from 'semantic-ui-react';

import { Entity } from '@/api/api';

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
};

export default function AppTable<T extends Entity>({
  columns,
  data,
  getRowOptions,
}: AppTableProps<T>) {
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
