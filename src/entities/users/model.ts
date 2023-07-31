import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { api } from 'shared/api';
import { Nullable, User } from 'shared/lib/types';

const getUser = createEvent<string>();
const getUserFx = createEffect(async (userId: string) => {
    const { data } = await api.users.get(userId);
    return data;
});

const getCurrentUser = createEvent();
const getCurrentUserFx = createEffect(async () => {
    const { data } = await api.users.getMe();
    return data;
});

const $usersMap = createStore<Map<string, User>>(new Map());
const $currentUser = createStore<Nullable<User>>(null);

sample({
    clock: getCurrentUser,
    target: getCurrentUserFx,
});

sample({
    clock: getCurrentUserFx.doneData,
    target: $currentUser,
});

sample({
    clock: getUser,
    source: $usersMap,
    filter: (usersMap, userId) => !usersMap.has(userId),
    fn: (_, userId) => userId,
    target: getUserFx,
});

sample({
    clock: getUserFx.doneData,
    source: $usersMap,
    fn: (usersMap, newData) => {
        const newUsers = new Map(usersMap);
        newUsers.set(newData.id, newData);
        return newUsers;
    },
    target: $usersMap,
});

const loadUser = createGate<string>({ defaultState: '' });

sample({
    source: {
        state: loadUser.state,
        status: loadUser.status,
    },
    filter: ({ status, state }) => Boolean(status && state),
    fn: ({ state }) => String(state),
    target: getUser,
});

const loadMe = createGate();

sample({
    clock: loadMe.open,
    target: getCurrentUser,
});

export const model = {
    loadUser,
    loadMe,
    getUser,
    $usersMap,
    $currentUser,
};
