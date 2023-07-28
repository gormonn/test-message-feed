import { axios } from 'shared/api/fake-api';
import { Nullable, User, UserMeta } from 'shared/lib/types';
// import axios from 'axios';

const users = {
    get: (userId: string) => axios.get<User>(`/users/${userId}`),
    getMe: () => axios.get<User>('/users/me'),
    find: (str: string) => axios.get<UserMeta[]>(`/users-meta/${str}`),
};

export type FeedNewMessagePayload = {
    text: string;
};
export type FeedFilterPayload = {
    users?: Nullable<string[]>;
    search?: string;
    and?: boolean;
};

const feed = {
    get: () => axios.get('/feed'),
    sendMessage: (payload: FeedNewMessagePayload) =>
        axios.post('/feed', payload),
    filter: (params: FeedFilterPayload) => axios.get('/feed', { params }),
};

export const api = {
    feed,
    users,
};
