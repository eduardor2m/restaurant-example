export interface IProductWithRef {
  id: string;
  name: string;
  category: string;
  price: number;
  measure: string;
  image: string;
  description: string;
  priceFormatted?: string;
  ref: any;
}

export type IProduct = Omit<IProductWithRef, 'ref'>;
