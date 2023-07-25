import { axios } from 'shared/api/fake-client';
// import { FeedMessage } from 'shared/lib/types';
// import axios from 'axios';

const users = {
    get: (userId: string) => axios.get(`/user/${userId}`),
    // getMessages: (userId: string) => {},
    getMe: () => axios.get('/user/me'),
    // getMyMessages: () => {},
};

export type FeedNewMessagePayload = {
    text: string;
    user: string;
};
export type FeedFilterPayload = {
    users?: string[];
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
