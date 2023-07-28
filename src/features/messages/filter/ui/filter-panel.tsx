import { ComponentPropsWithoutRef, FC, useRef } from 'react';
import { useGate, useUnit } from 'effector-react';
import clsx from 'clsx';
import { Panel } from 'shared/ui/panel';
import { shortcutsKeys, useHotkeys } from 'shared/lib/keyboard';
import { messageSendModel } from 'features/messages/send';
import { UsersFilter } from './users-filter';
import { UsersSelected } from './users-selected';
import { model } from '../model';
import css from './filter-panel.module.scss';
import { FeedFilterPayload } from 'shared/api';

export const FilterPanel: FC<
    ComponentPropsWithoutRef<'div'> & {
        defaultFilter?: FeedFilterPayload;
    }
> = ({ className, defaultFilter, ...divProps }) => {
    useGate(model.filtersDefault, defaultFilter);

    const [
        isModalOpen,
        setTextFilter,
        textFilter,
        setAnd,
        isAnd,
        isNeedAnd,
        resetFilters,
    ] = useUnit([
        messageSendModel.$isModalOpen,
        model.setTextFilter,
        model.$textFilter,
        model.setAnd,
        model.$isAnd,
        model.$isNeedAnd,
        model.resetFilters,
    ]);

    const searchRef = useRef<HTMLInputElement>(null);

    useHotkeys(
        shortcutsKeys.search,
        (e) => {
            e.preventDefault();
            searchRef?.current?.focus();
        },
        {
            enabled: !isModalOpen,
            eventListenerOptions: { capture: true },
            ignoredElementWhitelist: ['INPUT'],
        },
    );

    return (
        <Panel className={clsx(css.filter, className)} {...divProps}>
            <div className={css.filters}>
                <div className={css.col}>
                    {defaultFilter?.search == undefined && (
                        <label className={css.col}>
                            Search By Text:
                            <input
                                ref={searchRef}
                                className={css.input}
                                type="text"
                                onChange={(e) =>
                                    setTextFilter(e.target.value.trim())
                                }
                                value={textFilter}
                            />
                        </label>
                    )}
                    {defaultFilter?.and == undefined && (
                        <div className={clsx(css.row, css.radio_group)}>
                            <label className={css.radio}>
                                <input
                                    id="and"
                                    name="and"
                                    type="radio"
                                    value="true"
                                    checked={isAnd.toString() === 'true'}
                                    disabled={!isNeedAnd}
                                    onChange={() => setAnd(true)}
                                />
                                AND
                            </label>
                            <label className={css.radio}>
                                <input
                                    id="or"
                                    name="and"
                                    type="radio"
                                    value="false"
                                    checked={isAnd.toString() === 'false'}
                                    disabled={!isNeedAnd}
                                    onChange={() => setAnd(false)}
                                />
                                OR
                            </label>
                        </div>
                    )}
                    {defaultFilter?.users == undefined && (
                        <label className={css.col}>
                            Filter By Users:
                            <UsersFilter />
                        </label>
                    )}
                </div>
                <UsersSelected />
                <button onClick={resetFilters}>Reset</button>
            </div>
        </Panel>
    );
};
