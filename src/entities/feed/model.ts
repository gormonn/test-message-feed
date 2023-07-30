import { status } from 'patronum';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { api } from 'shared/api';
import { FeedFilterPayload, FeedMessage } from 'shared/lib/types';

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

const $getFeedStatus = status({ effect: getFeedFx });

const getFilteredFeed = createEvent<FeedFilterPayload>();
const getFilteredFeedFx = createEffect(
    async (filterParams: FeedFilterPayload) => {
        const { data } = await api.feed.filter(filterParams);
        return data;
    },
);

const $filteredFeed = createStore<FeedMessage[]>([]);

sample({
    clock: getFilteredFeed,
    target: getFilteredFeedFx,
});

sample({
    clock: getFilteredFeedFx.doneData,
    target: $filteredFeed,
});

const $getFilteredFeedStatus = status({ effect: getFilteredFeedFx });

export const model = {
    load,

    getFeed,
    $feed,
    $getFeedStatus,

    getFilteredFeed,
    $filteredFeed,
    $getFilteredFeedStatus,
};
