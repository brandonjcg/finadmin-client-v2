import { ColumnDef } from '@tanstack/react-table';
import { CheckboxFlag, DataTable, SelectBanks } from '@/components';
import { ITransaction } from '@/interfaces';

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
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>
      <SelectBanks label="Bank" endpoint={'bank'} paramName={'filters[bank]'} />
      <CheckboxFlag name="isPaid" label="Is paid?" />
      <CheckboxFlag name="isReserved" label="Is reserved?" />
      <DataTable columns={columns} endpoint={'transaction'} />
    </>
  );
}
