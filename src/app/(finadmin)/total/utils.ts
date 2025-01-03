import { TCheckboxFlags } from '@/types';

export const buildParam = (param: string, value: TCheckboxFlags) =>
  value === 'checked'
    ? `${param}=true`
    : value === 'indeterminate'
      ? `${param}=false`
      : '';

export const handleCheckboxChange = (
  currentState: TCheckboxFlags,
  setState: (state: TCheckboxFlags) => void,
) => {
  setState(
    currentState === 'checked'
      ? 'indeterminate'
      : currentState === 'indeterminate'
        ? 'unchecked'
        : 'checked',
  );
};
