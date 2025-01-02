'use client';

import { useState } from 'react';
import { TCheckboxFlags } from '@/types';
import { CheckboxFlagItem } from './CheckboxFlagItem';

interface Props {
  name: string;
  label: string;
  initialValue?: TCheckboxFlags;
}

export const CheckboxFlag = ({
  name,
  label,
  initialValue = 'unchecked',
}: Props) => {
  const [checked, setChecked] = useState<TCheckboxFlags>(initialValue);

  console.log(
    `🚀 ${new Date().toLocaleString('en-US', { timeZone: 'America/Tijuana', hour12: false })} ~ ${label} ~ checked:`,
    checked,
  );
  const handleChange = () => {
    setChecked((prev) => {
      if (prev === 'checked') return 'unchecked';
      if (prev === 'unchecked') return 'indeterminate';
      return 'checked';
    });
  };

  return (
    <CheckboxFlagItem
      name={name}
      label={label}
      checked={checked}
      onChange={handleChange}
    />
  );
};
