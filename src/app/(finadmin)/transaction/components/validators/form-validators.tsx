import { ValidationError } from '@tanstack/react-form';

interface FieldInfoProps {
  field: {
    state: {
      meta: {
        isTouched: boolean;
        errors: ValidationError[];
        isValidating: boolean;
      };
    };
  };
}

export const FieldInfo = ({ field }: FieldInfoProps) => {
  return (
    <div className="mt-2 text-sm">
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-500 dark:text-red-400">
          {field.state.meta.errors.join(',')}
        </em>
      ) : null}
      {field.state.meta.isValidating ? (
        <span className="text-blue-500 dark:text-blue-400">Validating...</span>
      ) : null}
    </div>
  );
};
