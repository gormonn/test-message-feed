import { FakeFeedConfig, FakeFeedReturn } from 'shared/lib/types';
import { getFakeMessages, getFakeUsers, getLastMessageUserId } from './lib';

export function createFakeData(config?: FakeFeedConfig): FakeFeedReturn {
    const users = getFakeUsers(config?.usersCount);
    const feed = getFakeMessages(users, config?.feedCount);
    const currentUserId = getLastMessageUserId(feed);
    return { users, feed, currentUserId };
}
