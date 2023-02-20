import { IProduct } from './product';

export type ICart = Pick<
  IProduct,
  | 'id'
  | 'name'
  | 'price'
  | 'measure'
  | 'image'
  | 'description'
  | 'category'
  | 'priceFormatted'
> & {
  quantity: number;
};
