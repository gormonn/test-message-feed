import add from 'date-fns/add';
import { faker } from '@faker-js/faker';
import { getRand, getRandomDuration, getRandomUser } from 'shared/api/utils';
import { FeedMessage, User } from 'shared/lib/types';

export const getFakeUser = (): User => ({
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
// мб лучше в author - id пользователя
// нужно генерить даты не в разнобой
export const getFakeMessage = ({
    userId,
    date,
    text,
}: CreateMessageProps): FeedMessage => ({
    id: faker.string.uuid(),
    date: date.toISOString(),
    // todo: max length 200
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

export type FakeFeedConfig = {
    messageCount?: number;
    usersCount?: number;
};
export type FakeFeedReturn = {
    users: User[];
    feed: FeedMessage[];
};

export function createFakeData(config?: FakeFeedConfig): FakeFeedReturn {
    const users = getFakeUsers(config?.usersCount);
    const feed = getFakeMessages(users, config?.messageCount);
    return { users, feed };
}
