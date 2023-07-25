export type Nullable<T> = T | null;

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatar: Nullable<string>;
};

export type Message = {
    id: string;
    date: string;
    text: string;
    author: User;
};
