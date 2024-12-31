'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { getData } from '@/actions';
import { IInfo } from '@/interfaces';
import { TableRowEmpty } from './TableRowEmpty';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  endpoint: string;
}

const getFilterParams = (searchParams: ReadonlyURLSearchParams) => {
  const filterParams: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (key.startsWith('filters[') && key.endsWith(']')) {
      filterParams[key] = value;
    }
  });

  return filterParams;
};

export function DataTable<TData, TValue>({
  columns,
  endpoint,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams?.get('page')) || 1;
  const totalPagesParam = Number(searchParams?.get('total')) || 10;

  const filterParams = useMemo(
    () => getFilterParams(searchParams),
    [searchParams],
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(pageParam);
  const [data, setData] = useState<TData[]>([]);
  const [info, setInfo] = useState<IInfo>({
    total: totalPagesParam,
  });

  const { total, totalPages = 10 } = info;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row: TData) => (row as { _id: string })._id,
    state: {
      sorting,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const queryString = new URLSearchParams({
        page: page.toString(),
        limit: totalPagesParam.toString(),
        ...filterParams,
      }).toString();

      const fullUrl = `${endpoint}?${queryString}`;
      const response = await getData<TData>({ url: fullUrl });
      setData(response.data);
      setInfo(response.info);
    };

    fetchData();
  }, [endpoint, filterParams, page, totalPagesParam]);

  const handleRowClick = (row: Row<TData>) =>
    router.push(`${endpoint}/${row.id}`);

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
              .rows.map((row) => (
                <TableRow
                  key={row.id}
                  row={row}
                  onClick={() => handleRowClick(row)}
                />
              ))
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
