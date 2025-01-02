import { ColumnDef } from '@tanstack/react-table';
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
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <SelectBanks
          label="Bank"
          endpoint={'bank'}
          paramName={`${PREFIX_FILTERS}[bank]`}
        />
        <CheckboxFlag name="isPaid" label="Is paid?" />
        <CheckboxFlag name="isReserved" label="Is reserved?" />
      </div>
      <DataTable columns={columns} endpoint={'transaction'} />
    </>
  );
}
