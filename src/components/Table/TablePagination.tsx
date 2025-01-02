interface Props {
  page: number;
  totalPages: number;
  totalRows: number;
  setPage: (page: number) => void;
}

export const TablePagination = ({
  page,
  totalPages,
  totalRows,
  setPage,
}: Props) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} - {totalPages} of {totalRows} rows
      </span>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};
