import { Row, flexRender } from '@tanstack/react-table';

interface Props<TData> {
  row: Row<TData>;
  onClick?: () => void;
}

export const TableRow = <TData,>({ row, onClick }: Props<TData>) => {
  return (
    <tr onClick={onClick} key={row.id} className="hover:bg-gray-700">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="px-6 py-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
