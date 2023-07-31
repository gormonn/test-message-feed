import { fakerConfig } from 'app/faker.config';
import { FakeFeedReturn, FeedFilterPayload, UserMeta } from 'shared/lib/types';
import { createFakeData } from '../create-fake-data';
import { createMessage } from '../lib';
import { matchText, matchUser } from './lib';
import { ApiMethodsProvider } from './type';

const DEFAULT_MOCK_KEY = 'default-mock';

function createMockAndSave(): FakeFeedReturn {
    const mock = createFakeData(fakerConfig);
    localStorage.setItem(DEFAULT_MOCK_KEY, JSON.stringify(mock));
    return mock;
}

function getMockLocalStorage(stable = true): FakeFeedReturn {
    if (!stable) return createFakeData(fakerConfig);
    try {
        const json = localStorage.getItem(DEFAULT_MOCK_KEY);
        return json === null ? createMockAndSave() : JSON.parse(json);
    } catch (e) {
        return createMockAndSave();
    }
}

const { users, feed, currentUserId } = getMockLocalStorage(true);

export const provider: ApiMethodsProvider = {
    getMe: () => {
        const currentUser = users.find((user) => user.id === currentUserId);
        if (currentUser) {
            return [200, currentUser];
        }
        return [404];
    },
    getUsers: (config) => {
        const userId = config?.url?.split('/')?.[2];
        const user = users.find((user) => user.id === userId);
        if (userId) {
            return user ? [200, user] : [404];
        }
        return [500];
    },
    getUsersMeta: (config) => {
        const string = config?.url?.split('/')?.[3].toLowerCase();
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
                    })) as UserMeta[],
            ];
        }
        return [500];
    },
    getFeed: (config) => {
        if (config?.params as FeedFilterPayload) {
            const { search, users, and } = config.params;

            // если and: true, то мы должны учитывать оба фильтра
            // если and: false, то мы можем учитывать любой из фильтров
            const newFeed = feed.filter((message) => {
                const userFilter = matchUser(users, message.userId);
                const textFilter = matchText(search, message.text);
                if (and === true) return userFilter && textFilter;
                if (and === false) return userFilter || textFilter;
                if (search) return textFilter;
                if (users) return userFilter;
                return true;
            });
            return [200, newFeed];
        }
        return [200, feed];
    },
    postFeed: (config) => {
        try {
            if (config.data) {
                // console.log(config.data, 'config.data');
                const newMessage = createMessage({
                    text: JSON.parse(config.data).text,
                    date: new Date().toISOString(),
                    userId: currentUserId,
                });
                feed.push(newMessage);
                return [204];
            } else {
                throw new Error();
            }
        } catch (e) {
            return [500];
        }
    },
};
