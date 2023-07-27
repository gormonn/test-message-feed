import { axios } from 'shared/api/fake-server';
// import axios from 'axios';

const users = {
    get: (userId: string) => axios.get(`/user/${userId}`),
    getMe: () => axios.get('/user/me'),
};

export type FeedNewMessagePayload = {
    text: string;
};
export type FeedFilterPayload = {
    // users?: Nullable<string[]>; // todo#: не забыть сделать много-выбор
    users?: string;
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
