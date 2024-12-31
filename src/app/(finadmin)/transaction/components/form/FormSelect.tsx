import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { IOption } from '@/interfaces';

interface Props {
  name: string;
  onChange: (value: string) => void;
  options: IOption[];
  optionKey?: keyof IOption;
}

export const FormSelect = ({ onChange, options, optionKey = '_id' }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <CreatableSelect
      instanceId={'wsad123wqwe'}
      isClearable
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      options={options.map((option) => ({
        key: option[optionKey],
        value: option[optionKey],
        label: option.text,
      }))}
      onChange={(selectedOption) => {
        const valueToSet =
          (selectedOption?.key ? selectedOption?.key : selectedOption?.label) ||
          '';
        return onChange(valueToSet);
      }}
    />
  ) : null;
};
