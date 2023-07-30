import {
    FeedFilterPayload,
    FeedNewMessagePayload,
    User,
    UserMeta,
} from 'shared/lib/types';
import { axios } from './fake/api';

// we can change mocks to real api by switching axios import
// import axios from 'axios';

const users = {
    get: (userId: string) => axios.get<User>(`/users/${userId}`),
    getMe: () => axios.get<User>('/users/me'),
    find: (str: string) => axios.get<UserMeta[]>(`/users/meta/${str}`),
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
