import { Form } from '../components';

interface Props {
  params: {
    id: string;
  };
}
export default function TransactionPage({ params }: Props) {
  const id = params.id;

  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Transactions {id}</h1>
      <Form id={id} />
    </>
  );
}
