export type Nullable<T> = T | null;

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatar: Nullable<string>;
};

export type UserMeta = Pick<User, 'id' | 'firstName' | 'lastName'>;

export type FeedMessage = {
    id: string;
    date: string;
    text: string;
    userId: string;
};

export type FeedNewMessagePayload = {
    text: string;
};

export type FeedFilterPayload = {
    users?: Nullable<string[]>;
    search?: string;
    and?: boolean;
};

export type FakeFeedConfig = {
    feedCount?: number;
    usersCount?: number;
};

export type FakeFeedReturn = {
    users: User[];
    feed: FeedMessage[];
    currentUserId: User['id'];
};

export type WithoutId<T> = Omit<T, 'id'>;
export type WithIndexedDb<T> = WithoutId<T> & { id: number };
export type IOptional<T, K extends keyof T> = Partial<T> & Omit<T, K>;

export type UserIdb = WithIndexedDb<User>;
export type FeedMessageIdb = WithIndexedDb<FeedMessage>;

// todo: это можно будет удалить, сомневаюсь что потребуется
export type FakeFeedReturnIdb = {
    users: UserIdb[];
    feed: FeedMessageIdb[];
};
