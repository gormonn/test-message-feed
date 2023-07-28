import {
    combine,
    createEffect,
    createEvent,
    createStore,
    restore,
    sample,
} from 'effector';
import { debounce, reset, spread } from 'patronum';
import { feedModel } from 'entities/feed';
import { api } from 'shared/api';
import { UserMeta } from 'shared/lib/types';

const setAnd = createEvent<boolean>();
const $isAnd = restore(setAnd, true);
const $isAndDeb = createStore(true);

const setTextFilter = createEvent<string>();
const $textFilter = restore(setTextFilter, '');
const $textFilterDeb = createStore('');

// todo: множественный выбор
// const setUsersFilter = createEvent<Nullable<string[]>>();
// const $usersFilter = createStore<Nullable<string[]>>(null);
const setUsersFilter = createEvent<string>();
const $usersFilter = restore<string>(setUsersFilter, '');
const $usersFilterDeb = createStore<string>('');

sample({ clock: setUsersFilter, target: $usersFilter });

const timeout = 300;
debounce({ source: $isAnd, timeout, target: $isAndDeb });
debounce({ source: $textFilter, timeout, target: $textFilterDeb });
debounce({ source: $usersFilter, timeout, target: $usersFilterDeb });

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

sample({ source: $usersFilterDeb, filter: Boolean, target: findUsers });
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
    source: $usersFilterDeb,
    filter: (val) => !val,
    target: resetFoundUsers,
});

reset({
    clock: resetFoundUsers,
    target: $foundUsers,
});

const $filters = combine(
    $isAndDeb,
    $textFilterDeb,
    $selectedUsersIds,
    (and, search, usersSet) => {
        const users = Array.from(usersSet);
        if (!search && !users?.length) {
            return null;
        }
        if (search && users?.length) {
            return {
                and,
                search,
                users,
            };
        }
        if (search) return { search };
        return { users };
    },
);

const $isNeedAnd = combine($textFilter, $usersFilter, (search, users) =>
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
        $usersFilter,
        $isAndDeb,
        $textFilterDeb,
        $usersFilterDeb,
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

    setUsersFilter,
    $usersFilter,
    $foundUsers,
    $foundUsersView,

    selectUser,
    removeUser,
    $selectedUsersView,
    $selectedUsersIds,

    openFoundUsers,
    closeFoundUsers,
    $isOpenFoundUsers,

    $filters,
    resetFilters,
};
