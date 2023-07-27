import { combine, createEvent, createStore, restore, sample } from 'effector';
import { debounce, reset } from 'patronum';
import { feedModel } from 'entities/feed';

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

sample({
    clock: setUsersFilter,
    target: $usersFilter,
});

const timeout = 600;
debounce({ source: $isAnd, timeout, target: $isAndDeb });
debounce({ source: $textFilter, timeout, target: $textFilterDeb });
debounce({ source: $usersFilter, timeout, target: $usersFilterDeb });

const $filters = combine(
    $isAndDeb,
    $textFilterDeb,
    $usersFilterDeb,
    (and, search, users) => {
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

    $filters,
    resetFilters,
};
