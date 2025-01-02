'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TCheckboxFlags } from '@/types';
import { CheckboxFlagItem } from './CheckboxFlagItem';
import { PREFIX_FILTERS } from '@/constants';

const mapFlags: { [key in TCheckboxFlags]: TCheckboxFlags } = {
  checked: 'indeterminate',
  unchecked: 'checked',
  indeterminate: 'unchecked',
};

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
  const router = useRouter();
  const params = useSearchParams();
  const [checked, setChecked] = useState<TCheckboxFlags>(() => {
    const valueFromParams = params.get(`${PREFIX_FILTERS}[${name}]`);
    if (valueFromParams === 'true') return 'checked';
    if (valueFromParams === 'false') return 'indeterminate';
    return initialValue;
  });

  useEffect(() => {
    const valueFromParams = params.get(`${PREFIX_FILTERS}[${name}]`);
    let newState: TCheckboxFlags = initialValue;
    if (valueFromParams === 'true') newState = 'checked';
    if (valueFromParams === 'false') newState = 'indeterminate';
    if (newState !== checked) {
      setChecked(newState);
    }
  }, [name, params, initialValue, checked]);

  const handleChange = () => {
    const newState = mapFlags[checked];
    const url = new URL(window.location.href);

    if (newState === 'unchecked') {
      url.searchParams.delete(`${PREFIX_FILTERS}[${name}]`);
    } else {
      url.searchParams.set(
        `${PREFIX_FILTERS}[${name}]`,
        newState === 'checked' ? 'true' : 'false',
      );
    }

    setChecked(newState);
    router.push(url.toString());
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
