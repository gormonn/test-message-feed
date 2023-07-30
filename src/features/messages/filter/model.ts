import { debounce, reset, spread } from 'patronum';
import {
    combine,
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from 'effector';
import { createGate } from 'effector-react';
import { feedModel } from 'entities/feed';
import { api } from 'shared/api';
import { FeedFilterPayload, Nullable, UserMeta } from 'shared/lib/types';

const setAnd = createEvent<boolean>();
const $isAnd = restore(setAnd, true);
const $isAndDeb = createStore(true);

const setTextFilter = createEvent<string>();
const $textFilter = restore(setTextFilter, '');
const $textFilterDeb = createStore('');

const setUsersToFind = createEvent<string>();
const $usersToFind = restore<string>(setUsersToFind, '');
const $usersToFindDeb = createStore<string>('');

//todo: remove
// sample({ clock: setUsersToFind, target: $usersToFind });

const timeout = 300;
debounce({ source: $isAnd, timeout, target: $isAndDeb });
debounce({ source: $textFilter, timeout, target: $textFilterDeb });
debounce({ source: $usersToFind, timeout, target: $usersToFindDeb });

const findUsers = createEvent<string>();
const findUsersFx = createEffect(async (str: string) => {
    const { data } = await api.users.find(str);
    return data;
});

const $foundUsers = createStore<UserMeta[]>([]);
const $foundUsersView = createStore<UserMeta[]>([]);

const closeFoundUsers = createEvent();
const openFoundUsers = createEvent();
const $isOpenFoundUsers = createStore<boolean>(false).reset(closeFoundUsers);

sample({
    clock: openFoundUsers,
    fn: () => true,
    target: $isOpenFoundUsers,
});

const resetFoundUsers = createEvent();

const selectUser = createEvent<UserMeta>();
const removeUser = createEvent<string>();
const $selectedUsersView = createStore<UserMeta[]>([]);
const $selectedUsersIds = createStore<Set<string>>(new Set());

sample({
    clock: selectUser,
    source: {
        ids: $selectedUsersIds,
        users: $selectedUsersView,
    },
    fn: (prev, newUser) => {
        const ids = new Set(prev.ids);
        const users = [...prev.users];
        if (!ids.has(newUser.id)) {
            ids.add(newUser.id);
            users.unshift(newUser);
        }
        return { ids, users };
    },
    target: spread({
        targets: {
            ids: $selectedUsersIds,
            users: $selectedUsersView,
        },
    }),
});

sample({
    clock: removeUser,
    source: {
        ids: $selectedUsersIds,
        users: $selectedUsersView,
    },
    fn: (prev, idToRemove) => {
        const ids = new Set(prev.ids);
        ids.delete(idToRemove);
        return {
            ids,
            users: prev.users.filter((user) => user.id !== idToRemove),
        };
    },
    target: spread({
        targets: {
            ids: $selectedUsersIds,
            users: $selectedUsersView,
        },
    }),
});

sample({
    source: { selected: $selectedUsersIds, found: $foundUsers },
    fn: ({ selected, found }) => found.filter((item) => !selected.has(item.id)),
    target: $foundUsersView,
});

sample({ source: $usersToFindDeb, filter: Boolean, target: findUsers });
sample({ clock: findUsers, target: findUsersFx });
sample({
    clock: findUsersFx.doneData,
    target: $foundUsers,
});

sample({
    source: $foundUsers,
    fn: () => true,
    target: $isOpenFoundUsers,
});

sample({
    source: $usersToFindDeb,
    filter: (val) => !val,
    target: resetFoundUsers,
});

reset({
    clock: resetFoundUsers,
    target: $foundUsers,
});

const filtersDefault = createGate<Nullable<FeedFilterPayload>>();
const $defaultFilter = createStore<Nullable<FeedFilterPayload>>(null);

sample({
    clock: filtersDefault.open,
    target: $defaultFilter,
});

const $filters = combine(
    $defaultFilter,
    $isAndDeb,
    $textFilterDeb,
    $selectedUsersIds,
    (defaultFilter, and, search, usersSet) => {
        console.log(defaultFilter, 'defaultFilter');

        const users = Array.from(usersSet);
        if (!search && !users?.length) {
            return null;
        }
        if (search && users?.length) {
            return {
                search,
                and: defaultFilter?.and || and,
                users: defaultFilter?.users || users,
            };
        }
        if (search && defaultFilter?.users)
            return {
                search,
                users: defaultFilter?.users,
                and: defaultFilter?.and,
            };

        if (search) return { search };
        return { users: defaultFilter?.users || users };
    },
);

const $isNeedAnd = combine($textFilter, $usersToFind, (search, users) =>
    Boolean(search && users),
);

sample({
    source: $filters,
    filter: Boolean,
    target: feedModel.getFilteredFeed,
});

const resetFilters = createEvent();

reset({
    clock: resetFilters,
    target: [
        $isAnd,
        $textFilter,
        $usersToFind,
        $isAndDeb,
        $textFilterDeb,
        $usersToFindDeb,
        $foundUsers,
        $selectedUsersView,
        $selectedUsersIds,
    ],
});

export const model = {
    setAnd,
    $isAnd,

    $isNeedAnd,

    setTextFilter,
    $textFilter,

    setUsersToFind,
    $usersToFind,
    $foundUsers,
    $foundUsersView,

    selectUser,
    removeUser,
    $selectedUsersView,
    $selectedUsersIds,

    openFoundUsers,
    closeFoundUsers,
    $isOpenFoundUsers,

    filtersDefault,
    $filters,
    resetFilters,
};
