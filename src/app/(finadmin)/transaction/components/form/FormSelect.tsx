import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { IOption } from '@/interfaces';

interface Props {
  name: string;
  onChange: (value: string) => void;
  options: IOption[];
  optionKey?: keyof IOption;
  value?: string;
}

export const FormSelect = ({
  onChange,
  options,
  optionKey = '_id',
  value,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const selectedOption = options.find((option) => option[optionKey] === value);

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
      value={
        selectedOption
          ? {
              key: selectedOption[optionKey],
              value: selectedOption[optionKey],
              label: selectedOption.text,
            }
          : {
              key: value,
              value: value,
              label: value,
            }
      }
      onChange={(selectedOption) => {
        const valueToSet =
          (selectedOption?.key ? selectedOption?.key : selectedOption?.label) ||
          '';
        return onChange(valueToSet);
      }}
    />
  ) : null;
};
