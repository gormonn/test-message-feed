import { AxiosRequestConfig } from 'axios';

type CallbackResponseSpecFunc = (
    config: AxiosRequestConfig,
) => any[] | Promise<any[]>;

export interface ApiMethodsProvider<T = CallbackResponseSpecFunc> {
    getMe: T;
    getUsers: T;
    getUsersMeta: T;
    getFeed: T;
    postFeed: T;
}
