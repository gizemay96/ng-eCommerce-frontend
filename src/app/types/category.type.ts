import { Product } from './product.type';

export type Category = {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  img?: object;
  products: Product[];
};
