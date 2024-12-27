'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { getData } from '@/actions';
import { TableRowEmpty } from './TableRowEmpty';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import { IInfo } from '@/interfaces';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams?.get('page')) || 1;
  const totalPagesParam = Number(searchParams?.get('total')) || 10;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(pageParam);
  const [data, setData] = useState<TData[]>([]);
  const [info, setInfo] = useState<IInfo>({
    total: totalPagesParam,
  });
  const [loading, setLoading] = useState(false);

  const { total, totalPages = 10 } = info;

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fullUrl = `transaction?page=${page}&filters[isPaid]=false&limit=${totalPagesParam}`;
      const response = await getData<TData>({ url: fullUrl });
      setData(response.data);
      setInfo(response.info);
      setLoading(false);
    };
    fetchData();
  }, [page, totalPagesParam]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-gray-800 text-left text-sm text-gray-300">
        <thead className="bg-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody className="divide-y divide-gray-700 border-t border-gray-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => <TableRow key={row.id} row={row} />)
          ) : (
            <TableRowEmpty rowsCount={columns.length} />
          )}
        </tbody>
      </table>
      <TablePagination
        page={page}
        totalRows={total}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
