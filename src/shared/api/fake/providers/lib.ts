import { FeedFilterPayload, User } from 'shared/lib/types';

export const matchUser = (
    users?: FeedFilterPayload['users'],
    userId?: User['id'],
): boolean => (users && userId ? Boolean(users?.includes(userId)) : true);

export const matchText = (search?: string, messageText?: string): boolean =>
    search && messageText
        ? messageText.toLowerCase().includes(search.toLowerCase())
        : true;
