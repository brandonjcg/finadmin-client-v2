interface Props {
  name: string;
  label: string;
}

export const FormLabel = ({ name, label }: Props) => {
  return (
    <label
      htmlFor={name}
      className="text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
  );
};
