import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components';
import { ITransaction } from '@/interfaces';
import { getData } from '@/actions';

const columns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: 'bank.name',
    header: 'Bank',
  },
  {
    accessorKey: 'store',
    header: 'Store',
  },
  {
    accessorKey: 'concept',
    header: 'Concept',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'isReserved',
    header: 'Reserved',
  },
];

export default async function TransactionPage() {
  const response = await getData<ITransaction>({ url: 'transaction' });

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>
      <DataTable columns={columns} data={response.data} />
    </>
  );
}
