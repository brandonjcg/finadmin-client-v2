import { IOption } from '@/interfaces';

interface Props {
  option: IOption;
  selectedOptions: string[];
  handleOptionToggle: (idOption: string) => void;
}

export const SelectBankItem = ({
  option,
  selectedOptions,
  handleOptionToggle,
}: Props) => {
  return (
    <>
      <label
        key={option._id}
        role="menuitem"
        className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <input
          type="checkbox"
          checked={selectedOptions.includes(option._id)}
          onChange={() => handleOptionToggle(option._id)}
          className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        />
        <span className="ml-2">{option.text}</span>
      </label>
    </>
  );
};
