import { Category } from './category.type';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  created_at?: string;
  updated_at?: string;
  img: object;
  categories: Category[];
};
