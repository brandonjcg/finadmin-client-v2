'use client';

import { toast } from 'react-toastify';
import { standardSchemaValidator, useForm } from '@tanstack/react-form';
import { createRow } from '@/actions';
import { transactionSchema } from '@/schemas';
import { FieldInfo } from '../validators';
import { useRouter } from 'next/navigation';

export const Form = () => {
  const router = useRouter();
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
    onSubmit: async ({ value: body }) => {
      const response = await createRow({
        url: 'transaction',
        body,
      });
      if (response.error)
        return response.message.forEach((message) => toast.error(message));

      toast.success(response.message);

      router.push('/transaction');
    },
    validatorAdapter: standardSchemaValidator(),
    validators: {
      onChange: transactionSchema,
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
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Bank
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="concept">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Concept
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="store">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Store
                </label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="amount">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Amount
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(+e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="date">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Date
                </label>
                <input
                  type="date"
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="isReserved">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Reserved
                </label>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="isPaid">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Paid
                </label>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="additionalComments">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Additional Comments
                </label>
                <textarea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};
