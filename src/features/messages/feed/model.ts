import { createEffect, createEvent, sample } from 'effector';
import { faker } from '@faker-js/faker';
import { feedModel } from 'entities/feed';
import { usersModel } from 'entities/users';
import { messageSendModel } from 'features/messages/send';

const optimisticUpdateFeed = createEvent<string>();
const optimisticUpdateFeedFx = createEffect();

sample({
    clock: messageSendModel.sendMessageFx.done,
    fn: ({ params }) => params,
    target: optimisticUpdateFeed,
});

sample({
    clock: optimisticUpdateFeed,
    target: optimisticUpdateFeedFx,
});

sample({
    // @ts-expect-error eslint-disable-next-line
    clock: optimisticUpdateFeedFx,
    source: {
        feed: feedModel.$feed,
        currentUser: usersModel.$currentUser,
    },
    filter: ({ currentUser }) => currentUser !== null,
    fn: ({ feed, currentUser }, text) => {
        const newMessage = {
            id: faker.string.uuid(),
            text,
            date: new Date().toISOString(),
            userId: currentUser?.id,
        };
        return [...feed, newMessage];
    },
    target: feedModel.$feed,
});

export const model = {
    optimisticUpdateFeed,
};
