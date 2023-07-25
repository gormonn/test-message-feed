import { User } from './User';

export type Message = {
    id: string;
    date: string;
    text: string;
    author: User;
};
