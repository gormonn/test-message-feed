import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createFakeData, createMessage } from './fake-data';
import { FeedFilterPayload } from 'shared/api/index';
import { getRandomUser, matchText, matchUser } from 'shared/api/lib';
import { fakerConfig } from 'app/faker.config';

const fakeInstance = new MockAdapter(axios, { delayResponse: 300 });

const { users, feed } = createFakeData(fakerConfig);
const currentUser = getRandomUser(users);

fakeInstance.onGet('/user/me').reply(200, currentUser);
fakeInstance.onGet(new RegExp(`/user/*`)).reply((config) => {
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
            if (and && userFilter && textFilter) {
                return true;
            } else {
                if (userFilter) {
                    return true;
                }
                if (textFilter) {
                    return true;
                }
            }
            return false;
        });
        return [200, newFeed];
    }
    return [200, feed];
});

fakeInstance.onPost('/feed').reply((config) => {
    try {
        if (config.data) {
            const newMessage = createMessage({
                text: config.data.text,
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
