import { FeedFilterPayload, User } from 'shared/lib/types';

export const matchUser = (
    users: FeedFilterPayload['users'],
    userId: User['id'],
) => Boolean(users?.includes(userId));

export const matchText = (search: string, messageText: string) =>
    Boolean(search && messageText.toLowerCase().includes(search.toLowerCase()));
