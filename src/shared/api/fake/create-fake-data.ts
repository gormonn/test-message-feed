import { FakeFeedConfig, FakeFeedReturn } from 'shared/lib/types';
import {
    createMessage,
    getFakeMessages,
    getFakeUsers,
    getLastMessageUserId,
} from './lib';

const helpText = `
Use the keyboard shortcuts:
Meta + Enter: To open the "New Message" form.
Enter: To send a message while the "New Message" form is open.
Escape: To close the "New Message" form.
Meta + Shift + F: To focus on the Search Input.

Note:
"Meta" refers to the Cmd (⌘) key on macOS.
"Meta" refers to the Windows (⊞) key on Windows.
`;

const helpMessage = (userId: string) =>
    createMessage({
        userId,
        date: new Date().toISOString(),
        text: helpText,
    });

export function createFakeData(config?: FakeFeedConfig): FakeFeedReturn {
    const users = getFakeUsers(config?.usersCount);
    const feed = getFakeMessages(users, config?.feedCount);
    const currentUserId = getLastMessageUserId(feed);

    feed.push(helpMessage(currentUserId));
    return { users, feed, currentUserId };
}
