import { base, en, Faker } from '@faker-js/faker';
import add from 'date-fns/add';
import { FeedMessage, User } from 'shared/lib/types';

const faker = new Faker({ locale: [en, base] });

export const getRand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomUser = (users: User[]) =>
    users[Math.floor(Math.random() * users.length)];

export const getLastMessageUser = (feed: FeedMessage[], users: User[]): User =>
    users.find((user) => user.id === feed[feed.length - 1].userId) as User; // guilty

export const getLastMessageUserId = (feed: FeedMessage[]): User['id'] =>
    feed[feed.length - 1].userId;

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

export const getFakeUser = () => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.person.bio(),
    avatar: getRand(0, 1) ? faker.image.avatar() : null,
});

export const getFakeUsers = (length = 10) =>
    Array.from({ length }, getFakeUser);

type CreateMessageProps = {
    userId: string;
    date: Date;
    text?: string;
};

export const getFakeMessage = ({
    userId,
    date,
    text,
}: CreateMessageProps): FeedMessage => ({
    id: faker.string.uuid(),
    date: date.toISOString(),
    text: text || faker.lorem.paragraphs({ min: 1, max: 3 }).slice(0, 200),
    userId,
});

export const createMessage = ({
    userId,
    date,
    text,
}: Omit<Required<CreateMessageProps>, 'date'> & {
    date: string;
}): FeedMessage => ({
    id: faker.string.uuid(),
    date,
    text,
    userId,
});

export const getFakeMessages = (users: User[], length = 30) => {
    let startDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 2),
    );
    return Array.from({ length }, () => {
        startDate = add(startDate, getRandomDuration());
        return getFakeMessage({
            userId: getRandomUser(users).id,
            date: startDate,
        });
    });
};
