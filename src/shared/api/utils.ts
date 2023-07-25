import { User } from 'shared/lib/types';

export const getRand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomUser = (users: User[]) =>
    users[Math.floor(Math.random() * users.length)];

export const getRandomDuration = () => {
    return {
        years: 0,
        months: 0,
        weeks: 0,
        days: getRand(0, 2),
        hours: getRand(0, 24),
        minutes: getRand(0, 60),
        seconds: getRand(0, 60),
    };
};
