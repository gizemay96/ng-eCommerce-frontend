import { User } from './user.type';

export type Address = {
    id?: number;
    name: string;
    streetName: string;
    suite: string;
    city: string;
    country: string;
    user?: User;
    created_at?: string;
    updated_at?: string;
}