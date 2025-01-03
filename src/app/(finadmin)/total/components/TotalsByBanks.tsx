'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { getData } from '@/actions';
import { ITotalByBanks } from '@/interfaces';
import { ListBanks } from './ListBanks';

export const TotalsByBanks = () => {
  const [isReserved, setIsReserved] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [total, setTotal] = useState(0);
  const [idRowsSelected, setIdRowsSelected] = useState<string[]>([]);

  const handleSubmit = async () => {
    const response = await getData<ITotalByBanks>({
      url: `transaction/bank/group?isReserved=${isReserved}&isPaid=${isPaid}&ids=${idRowsSelected.join(',')}`,
      cache: 'no-store',
    });

    if (response.error)
      return response.message.forEach((message) => toast.error(message));

    setTotal(response.data.total);
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {total ? `Total: $${total}` : 'Select banks'}
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isReserved}
            onChange={() => setIsReserved(!isReserved)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span>Is reserved?</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={() => setIsPaid(!isPaid)}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span>Is paid?</span>
        </label>
        <div className="col-span-2 flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-6 py-2 rounded-lg text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={!idRowsSelected.length}
          >
            Enviar
          </button>
        </div>
      </div>

      <ListBanks handleBankSelection={setIdRowsSelected} />
    </div>
  );
};
