import add from 'date-fns/add';
import { faker } from '@faker-js/faker';
import { getRand, getRandomDuration, getRandomUser } from 'shared/api/utils';
import { Message, User } from 'shared/lib/types';

export const getFakeUser = (): User => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.person.bio(),
    avatar: getRand(0, 1) ? faker.image.avatar() : null,
});

export const getFakeUsers = (length = 10) =>
    Array.from({ length }, getFakeUser);

// мб лучше в author - id пользователя
// нужно генерить даты не в разнобой
export const getFakeMessage = (author: User, date: Date): Message => ({
    id: faker.string.uuid(),
    text: faker.lorem.paragraphs({ min: 1, max: 3 }).slice(0, 200), // todo: max length 200
    date: date.toISOString(),
    author,
});

export const getFakeMessages = (users: User[], length = 30) => {
    let date = new Date();
    return Array.from({ length }, () => {
        date = add(date, getRandomDuration());
        return getFakeMessage(getRandomUser(users), date);
    });
};

export type FakeFeedConfig = {
    messageCount?: number;
    usersCount?: number;
};
// export function createFakeFeed():User[];
// export function createFakeFeed(config: FakeFeedConfig):User[];
export function createFakeFeed(config?: FakeFeedConfig) {
    const users = getFakeUsers(config?.usersCount);
    const messages = getFakeMessages(users, config?.messageCount);
    return messages;
}
