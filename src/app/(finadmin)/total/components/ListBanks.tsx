'use client';

import { useGetSelect } from '@/hooks';
import { ListBanksItem } from './ListBanksItem';

interface Props {
  handleBankSelection: (updater: (prev: string[]) => string[]) => void;
}

export const ListBanks = ({ handleBankSelection }: Props) => {
  const { rows: banks } = useGetSelect({ url: 'bank/select' });

  const handleOnSelect = (idBank: string) => {
    handleBankSelection((prev: string[]) => {
      if (prev.includes(idBank))
        return prev.filter((id: string) => id !== idBank);

      return [...prev, idBank];
    });
  };

  return (
    <div className="space-y-4">
      {banks.map((bank) => (
        <ListBanksItem
          key={bank._id}
          bank={bank}
          handleOnSelect={handleOnSelect}
        />
      ))}
    </div>
  );
};
