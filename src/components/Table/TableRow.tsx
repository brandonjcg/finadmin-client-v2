import { Row, flexRender } from '@tanstack/react-table';

interface Props<TData> {
  row: Row<TData>;
}

export const TableRow = <TData,>({ row }: Props<TData>) => {
  return (
    <tr key={row.id} className="hover:bg-gray-700">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-6 py-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
