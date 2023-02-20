import { ICart } from './cart';

export interface IOrder {
  name?: string;
  street?: string;
  number?: number;
  complement?: string;
  neighborhood?: string;
  reference?: string;
  formPayment?: string;
  cart: ICart[];
}
