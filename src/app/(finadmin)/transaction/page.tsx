import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components';
import { ITransaction } from '@/interfaces';

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Array.from({ length: 127 }).map((_row, index) => ({
    _id: '67284fc4ff1ca327f163fcd0',
    amount: 149.9,
    concept: `Pijama Saulito ${index + 1}`,
    bank: {
      _id: '12f16a203067606140641235',
      name: 'Plata Card',
      logo: 'https://platacard.mx/static/origination-client-web/metadata/default-preview.png',
    },
    store: 'Woolworth',
    date: '2024-11-03T00:00:00.000Z',
    additionalComments: '',
    isReserved: false,
    isPaid: false,
    active: true,
    createdAt: '2024-11-04T04:38:28.527Z',
    updatedAt: '2024-11-04T04:38:28.527Z',
    __v: 0,
  }));
}

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
  const data = await getData();

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Transactions</h1>
      <DataTable columns={columns} data={data} />
    </>
  );
}
