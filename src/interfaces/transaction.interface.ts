import { IBank } from './bank.interface';

export interface ITransaction {
  _id: string;
  amount: number;
  concept: string;
  bank: IBank;
  store: string;
  date: string;
  additionalComments: string;
  isReserved: boolean;
  isPaid: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITransactionById {
  _id: string;
  amount: number;
  concept: string;
  bank: string;
  store: string;
  date: string;
  additionalComments: string;
  isReserved: boolean;
  isPaid: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
