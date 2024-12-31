'use client';

import { useRouter } from 'next/navigation';
import { standardSchemaValidator, useForm } from '@tanstack/react-form';
import { toast } from 'react-toastify';
import { createRow } from '@/actions';
import { useGetSelect } from '@/hooks';
import { transactionSchema } from '@/schemas';
import { FieldInfo } from '../validators';
import { FormLabel } from './FormLabel';
import { FormInput, FormInputArea } from './FormInputs';
import { FormSelect } from './FormSelect';

export const Form = () => {
  const router = useRouter();
  const { rows: banks } = useGetSelect({ url: 'bank/select' });
  const { rows: stores } = useGetSelect({ url: 'transaction/store/select' });

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
                <FormLabel name={field.name} label="Bank" />
                <FormSelect
                  name={field.name}
                  onChange={field.handleChange}
                  options={banks}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="concept">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Concept" />
                <FormInput
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeString={field.handleChange}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="store">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Store" />
                <FormSelect
                  name={field.name}
                  onChange={field.handleChange}
                  options={stores}
                  optionKey="text"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="amount">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Amount" />
                <FormInput
                  type="number"
                  name={field.name}
                  value={+field.state.value}
                  onBlur={field.handleBlur}
                  onChangeNumber={field.handleChange}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="date">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Date" />
                <FormInput
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeString={field.handleChange}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="isReserved">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Is reserved?" />
                <FormInput
                  type="checkbox"
                  name={field.name}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeBoolean={field.handleChange}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="isPaid">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Is pais?" />
                <FormInput
                  type="checkbox"
                  name={field.name}
                  checked={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeBoolean={field.handleChange}
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="additionalComments">
            {(field) => (
              <div className="space-y-2">
                <FormLabel name={field.name} label="Additional comments" />
                <FormInputArea
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChangeString={field.handleChange}
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
