import { User } from 'shared/lib/types';
import { FeedFilterPayload } from 'shared/api/index';

export const getRand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomUser = (users: User[]) =>
    users[Math.floor(Math.random() * users.length)];

export const getRandomDuration = () => {
    return {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: getRand(0, 1),
        minutes: getRand(0, 60),
        seconds: getRand(0, 60),
    };
};

export const matchUser = (
    users: FeedFilterPayload['users'],
    userId: User['id'],
) => Boolean(users?.includes(userId));

export const matchText = (search: string, messageText: string) =>
    Boolean(search && messageText.toLowerCase().includes(search));
