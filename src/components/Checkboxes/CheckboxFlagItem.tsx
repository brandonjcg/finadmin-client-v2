import { TCheckboxFlags } from '@/types';

interface Props {
  name: string;
  label: string;
  checked: TCheckboxFlags;
  onChange: () => void;
}

export const CheckboxFlagItem = ({ name, label, checked, onChange }: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked === 'checked'}
        onChange={onChange}
        ref={(input) => {
          if (input) input.indeterminate = checked === 'indeterminate';
        }}
        className="form-checkbox h-5 w-5 text-gray-600 bg-gray-800 border-gray-700 focus:ring-gray-500"
        id={name}
      />
      <label htmlFor={name} className="text-white font-bold">
        {label}
      </label>
    </div>
  );
};
