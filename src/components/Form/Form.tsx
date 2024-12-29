'use client';

import { useForm } from '@tanstack/react-form';

export const Form = () => {
  const form = useForm({
    defaultValues: {
      bank: '',
      concept: '',
      store: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      isReserved: false,
      isPaid: false,
      additionalComments: '',
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="bg-gray-800 dark:text-white p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="mb-5 space-y-4">
          <form.Field name="bank">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Bank
                </label>
                <input
                  name={fieldProps.name}
                  value={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="concept">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Concept
                </label>
                <input
                  name={fieldProps.name}
                  value={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="store">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Store
                </label>
                <input
                  name={fieldProps.name}
                  value={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="amount">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name={fieldProps.name}
                  value={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(+e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="date">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Date
                </label>
                <input
                  type="date"
                  name={fieldProps.name}
                  value={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="isReserved">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Reserved
                </label>
                <input
                  type="checkbox"
                  name={fieldProps.name}
                  checked={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.checked)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="isPaid">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Paid
                </label>
                <input
                  type="checkbox"
                  name={fieldProps.name}
                  checked={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.checked)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>

          <form.Field name="additionalComments">
            {(fieldProps) => (
              <div className="space-y-2">
                <label
                  htmlFor={fieldProps.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Additional Comments
                </label>
                <textarea
                  name={fieldProps.name}
                  value={fieldProps.state.value}
                  onBlur={fieldProps.handleBlur}
                  onChange={(e) => fieldProps.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </form.Field>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
