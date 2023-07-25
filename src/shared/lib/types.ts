export type Nullable<T> = T | null;

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatar: Nullable<string>;
};

export type FeedMessage = {
    id: string;
    date: string;
    text: string;
    userId: string;
};
