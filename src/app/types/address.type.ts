import { User } from './user.type';

export type Address = {
    id: number;
    user: User;
    addressName:string;
    streetName: string;
    suite: string;
    city: string;
    country: string;
    created_at?: string;
    updated_at?: string;
}