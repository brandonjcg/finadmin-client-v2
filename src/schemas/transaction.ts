import { z } from 'zod';

export const transactionSchema = z.object({
  bank: z.string().nonempty('Bank is required'),
  concept: z.string().nonempty('Concept is required'),
  store: z.string().nonempty('Store is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  date: z.string().nonempty('Date is required'),
  isReserved: z.boolean(),
  isPaid: z.boolean(),
  additionalComments: z.string().optional(),
});

export type TTransaction = z.infer<typeof transactionSchema>;
