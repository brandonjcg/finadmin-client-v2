interface Props {
  name: string;
  value?: string | number;
  checked?: boolean;
  type?: string;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChangeString?: (value: string) => void;
  onChangeNumber?: (value: number) => void;
  onChangeBoolean?: (value: boolean) => void;
}

export const FormInput = ({
  name,
  type = 'text',
  checked,
  onBlur,
  onChangeString,
  onChangeNumber,
  onChangeBoolean,
  value,
}: Props) => {
  const onChangeByType = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case 'number':
        onChangeNumber?.(Number(e.target.value));
        break;
      case 'checkbox':
        onChangeBoolean?.(e.target.checked);
        break;
      default:
        onChangeString?.(e.target.value);
    }
  };

  return (
    <input
      type={type}
      checked={checked}
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChangeByType}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />
  );
};

export const FormInputArea = ({
  name,
  onBlur,
  onChangeString,
  value,
}: Omit<Props, 'type' | 'checked' | 'onChangeNumber' | 'onChangeBoolean'>) => {
  return (
    <textarea
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={(e) => onChangeString?.(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
    />
  );
};
