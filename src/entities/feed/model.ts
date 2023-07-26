import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { pending, status } from 'patronum';
import { api } from 'shared/api';
import { FeedMessage } from 'shared/lib/types';

const load = createGate();
const getFeed = createEvent();
const getFeedFx = createEffect(async () => {
    const { data } = await api.feed.get();
    return data;
});
const $feed = createStore<FeedMessage[]>([]);

sample({
    clock: load.open,
    target: getFeed,
});

sample({
    clock: getFeed,
    target: getFeedFx,
});

sample({
    clock: getFeedFx.doneData,
    target: $feed,
});

const $isLoading = pending({
    effects: [getFeedFx],
    of: 'every',
});
const $status = status({ effect: getFeedFx });

export const model = {
    load,
    getFeed,
    $feed,
    $isLoading,
    $status,
};
