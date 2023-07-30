import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { RESPONSE_DELAY } from 'app/faker.config';
import { lsProvider } from './providers';

const fakeInstance = new MockAdapter(axios, { delayResponse: RESPONSE_DELAY });

const provider = lsProvider;

fakeInstance.onGet('/users/me').reply(provider.getMe);
fakeInstance.onGet(new RegExp(`/users/meta/*`)).reply(provider.getUsersMeta);
fakeInstance.onGet(new RegExp(`/users/*`)).reply(provider.getUsers);
fakeInstance.onGet('/feed').reply(provider.getFeed);
fakeInstance.onPost('/feed').reply(provider.postFeed);

export { axios };
