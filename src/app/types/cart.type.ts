import { User } from './user.type';
import { Product } from './product.type';

export type Cart = {
    id?: number;
    user: User | number;
    orders: any[];
    created_at?: string;
    updated_at?: string;
}