import { IOption } from '@/interfaces';
import Image from 'next/image';

interface Props {
  bank: IOption;
  handleOnSelect: (idBank: string) => void;
}

export const ListBanksItem = ({ bank, handleOnSelect }: Props) => {
  return (
    <label
      key={bank._id}
      className="flex items-center space-x-4 border-b border-gray-700 pb-4 cursor-pointer"
      onClick={() => handleOnSelect(bank._id)}
    >
      <input
        type="checkbox"
        className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        onClick={(e) => e.stopPropagation()}
      />
      <Image
        src={bank.logo!}
        alt={bank.text}
        className="h-8 w-8 rounded-full"
        width={32}
        height={32}
      />
      <span>{bank.text}</span>
    </label>
  );
};
