'use client';

import { useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { TableRowEmpty } from './TableRowEmpty';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-gray-800 text-left text-sm text-gray-300">
        <thead className="bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody className="divide-y divide-gray-700 border-t border-gray-700">
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => <TableRow key={row.id} row={row} />)
          ) : (
            <TableRowEmpty rowsCount={columns.length} />
          )}
        </tbody>
      </table>
    </div>
  );
}
