import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

interface TableHeaderProps<TData> {
  headerGroup: HeaderGroup<TData>;
}

export function TableHeader<TData>({ headerGroup }: TableHeaderProps<TData>) {
  return (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th key={header.id} className="px-6 py-4 font-medium text-gray-100">
          {header.isPlaceholder ? null : (
            <div
              className="flex items-center cursor-pointer"
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              <span className="ml-2">
                {header.column.getIsSorted() === 'asc' ? (
                  <FaSortUp className="h-4 w-4" />
                ) : header.column.getIsSorted() === 'desc' ? (
                  <FaSortDown className="h-4 w-4" />
                ) : (
                  <FaSort className="h-4 w-4" />
                )}
              </span>
            </div>
          )}
        </th>
      ))}
    </tr>
  );
}
