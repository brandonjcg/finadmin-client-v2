import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { CheckboxFlag, DataTable, SelectBanks } from '@/components';
import { ITransaction } from '@/interfaces';
import { PREFIX_FILTERS } from '@/constants';

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

export default function TransactionPage() {
  const name = 'transaction';
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Link
          href={`/${name}/new`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add transaction
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <SelectBanks
          label="Bank"
          endpoint={'bank'}
          paramName={`${PREFIX_FILTERS}[bank]`}
        />
        <CheckboxFlag name="isPaid" label="Is paid?" />
        <CheckboxFlag name="isReserved" label="Is reserved?" />
      </div>
      <DataTable columns={columns} endpoint={name} />
    </>
  );
}
