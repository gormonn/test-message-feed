import { ComponentPropsWithoutRef, FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useGate, useUnit } from 'effector-react';
import { messageSendModel } from 'features/messages/send';
import { shortcutsKeys, useHotkeys } from 'shared/lib/keyboard';
import { FeedFilterPayload } from 'shared/lib/types';
import { Panel } from 'shared/ui/panel';
import { model } from '../model';
import css from './filter-panel.module.scss';
import { UsersFilter } from './users-filter';
import { UsersSelected } from './users-selected';

export const FilterPanel: FC<
    ComponentPropsWithoutRef<'div'> & {
        defaultFilters?: FeedFilterPayload;
    }
> = ({ className, defaultFilters, ...divProps }) => {
    useGate(model.setDefaultFilters, defaultFilters);

    const [
        isModalOpen,
        setTextFilter,
        textFilter,
        setAnd,
        isAnd,
        isNeedAnd,
        resetFilters,
        filters,
    ] = useUnit([
        messageSendModel.$isModalOpen,
        model.setTextFilter,
        model.$textFilter,
        model.setAnd,
        model.$isAnd,
        model.$isNeedAnd,
        model.resetFilters,
        model.$filters,
    ]);
    useEffect(() => {
        console.log(filters, '$filters');
    }, [filters]);
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
                    {defaultFilters?.search == undefined && (
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
                    {defaultFilters?.and == undefined && (
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
                    {defaultFilters?.users == undefined && <UsersFilter />}
                </div>
                <UsersSelected />
                <button onClick={resetFilters}>Reset</button>
            </div>
        </Panel>
    );
};
