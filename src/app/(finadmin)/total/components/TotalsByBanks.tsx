'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { getData } from '@/actions';
import { CheckboxFlagItem } from '@/components';
import { TCheckboxFlags } from '@/types';
import { ITotalByBanks } from '@/interfaces';
import { formatNumberAsCurrency } from '@/utils';
import { ListBanks } from './ListBanks';
import { buildParam, handleCheckboxChange } from '../utils';

export const TotalsByBanks = () => {
  const [isReserved, setIsReserved] = useState<TCheckboxFlags>('unchecked');
  const [isPaid, setIsPaid] = useState<TCheckboxFlags>('unchecked');
  const [total, setTotal] = useState('');
  const [idRowsSelected, setIdRowsSelected] = useState<string[]>([]);

  const handleSubmit = async () => {
    setTotal('0');
    const params = [
      buildParam('isReserved', isReserved),
      buildParam('isPaid', isPaid),
      idRowsSelected.length ? `ids=${idRowsSelected.join(',')}` : '',
    ]
      .filter(Boolean)
      .join('&');

    const response = await getData<ITotalByBanks>({
      url: `transaction/bank/group?${params}`,
      cache: 'no-store',
    });
    if (response.error)
      return response.message.forEach((message) => toast.error(message));

    setTotal(formatNumberAsCurrency(response.data.total));
  };

  return (
    <div className="bg-gray-800 min-h-screen text-white p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {total ? `Total: ${total}` : 'Select banks'}
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <CheckboxFlagItem
          name="isPaid"
          label="Is paid?"
          checked={isPaid}
          onChange={() => handleCheckboxChange(isPaid, setIsPaid)}
        />
        <CheckboxFlagItem
          name="isReserved"
          label="Is reserved?"
          checked={isReserved}
          onChange={() => handleCheckboxChange(isReserved, setIsReserved)}
        />
        <div className="col-span-2 flex items-center justify-end">
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              idRowsSelected.length
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
            disabled={!idRowsSelected.length}
          >
            Calculate
          </button>
        </div>
      </div>

      <ListBanks handleBankSelection={setIdRowsSelected} />
    </div>
  );
};
