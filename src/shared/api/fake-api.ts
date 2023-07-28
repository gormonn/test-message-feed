import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fakerConfig, RESPONSE_DELAY } from 'app/faker.config';
import { FeedFilterPayload } from 'shared/api/index';
import { getRandomUser, matchText, matchUser } from 'shared/api/lib';
import { createFakeData, createMessage } from './fake-data';

const fakeInstance = new MockAdapter(axios, { delayResponse: RESPONSE_DELAY });

const { users, feed } = createFakeData(fakerConfig);
const currentUser = getRandomUser(users);

fakeInstance.onGet('/users/me').reply(200, currentUser);

fakeInstance.onGet(new RegExp(`/users-meta/*`)).reply((config) => {
    const string = config?.url?.split('/')?.[2].toLowerCase();
    if (string) {
        return [
            200,
            users
                .filter((user) =>
                    `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
                        string,
                    ),
                )
                .map(({ id, firstName, lastName }) => ({
                    id,
                    firstName,
                    lastName,
                })),
        ];
    }
    return [500];
});

fakeInstance.onGet(new RegExp(`/users/*`)).reply((config) => {
    const userId = config?.url?.split('/')?.[2];
    const user = users.find((user) => user.id === userId);
    if (userId) {
        return user ? [200, user] : [404];
    }
    return [500];
});

fakeInstance.onGet('/feed').reply((config) => {
    if (config?.params as FeedFilterPayload) {
        const { search, users, and } = config.params;
        // если and: true, то мы должны учитывать оба фильтра
        // если and: false, то мы можем учитывать любой из фильтров
        const newFeed = feed.filter((message) => {
            const userFilter = matchUser(users, message.userId);
            const textFilter = matchText(search, message.text);
            if (and) {
                return userFilter && textFilter;
            } else {
                return userFilter || textFilter;
            }
        });
        return [200, newFeed];
    }
    return [200, feed];
});

fakeInstance.onPost('/feed').reply((config) => {
    try {
        if (config.data) {
            // console.log(config.data, 'config.data');
            const newMessage = createMessage({
                text: JSON.parse(config.data).text,
                date: new Date().toISOString(),
                userId: currentUser.id,
            });
            feed.push(newMessage);
            return [204];
        } else {
            throw new Error();
        }
    } catch (e) {
        return [500];
    }
});

export { axios };