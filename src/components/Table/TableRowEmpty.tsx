interface Props {
  rowsCount: number;
}

export const TableRowEmpty = ({ rowsCount }: Props) => {
  return (
    <tr>
      <td colSpan={rowsCount} className="h-24 text-center">
        No results.
      </td>
    </tr>
  );
};
