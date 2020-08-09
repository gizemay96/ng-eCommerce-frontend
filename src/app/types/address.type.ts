import { User } from './user.type';

export type Address = {
    id: number;
    user: User;
    streetName: string;
    suite: string;
    city: string;
    county: string;
    created_at?: string;
    updated_at?: string;
}