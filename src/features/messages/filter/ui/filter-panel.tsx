import { ComponentPropsWithoutRef, FC, useRef } from 'react';
import { useUnit } from 'effector-react';
import clsx from 'clsx';
import { useSpring, animated } from 'react-spring';
import { Panel } from 'shared/ui/panel';
import { shortcutsKeys, useHotkeys } from 'shared/lib/keyboard';
import { messageSendModel } from 'features/messages/send';
import { model } from '../model';
import style from './filter-panel.module.scss';

export const FilterPanel: FC<ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...divProps
}) => {
    const [
        isModalOpen,
        setTextFilter,
        textFilter,
        setUsersFilter,
        usersFilter,
        setAnd,
        isAnd,
        filters,
        isNeedAnd,
        resetFilters,
    ] = useUnit([
        messageSendModel.$isModalOpen,
        model.setTextFilter,
        model.$textFilter,
        model.setUsersFilter,
        model.$usersFilter,
        model.setAnd,
        model.$isAnd,
        model.$filters,
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

    const andStyle = useSpring({
        opacity: isNeedAnd ? 1 : 0,
    });

    const resetStyle = useSpring({
        opacity: filters ? 1 : 0,
    });

    return (
        <Panel className={clsx(style.filter, className)} {...divProps}>
            <h3 className={style.heading}>Filter</h3>
            <div className={style.filters}>
                <label className={style.label}>
                    Search By Text:
                    <input
                        ref={searchRef}
                        className={style.input}
                        type="text"
                        onChange={(e) => setTextFilter(e.target.value.trim())}
                        value={textFilter}
                    />
                </label>
                <label className={style.label}>
                    Filter By Users:
                    <input
                        className={style.input}
                        type="text"
                        onChange={(e) => setUsersFilter(e.target.value.trim())}
                        value={usersFilter}
                    />
                </label>
                <animated.div style={andStyle} className={style.label}>
                    <label className={style.radio}>
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
                    <label className={style.radio}>
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
                </animated.div>
                <animated.button style={resetStyle} onClick={resetFilters}>
                    Reset
                </animated.button>
            </div>
        </Panel>
    );
};
