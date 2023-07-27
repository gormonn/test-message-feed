import { ComponentPropsWithoutRef, FC } from 'react';
import clsx from 'clsx';
import { shortcutsKeys, useHotkeys } from 'shared/lib/keyboard';
import style from 'features/messages/filter/ui/filter-panel.module.scss';
import { Panel } from 'shared/ui/panel';

export const FilterPanel: FC<ComponentPropsWithoutRef<'div'>> = ({
    className,
    ...divProps
}) => {
    // todo: open filters menu

    useHotkeys(
        shortcutsKeys.search,
        (e) => {
            e.preventDefault();
        },
        {
            eventListenerOptions: { capture: true },
        },
    );

    return (
        <Panel className={clsx(style.filter, className)} {...divProps}>
            <h3 className={style.heading}>Filter</h3>
            <div className={style.filters}>
                <label className={style.label}>
                    Search By Text:
                    <input className={style.input} type="text" />
                </label>
                <label className={style.label}>
                    Filter By Users:
                    <input className={style.input} type="text" />
                </label>
            </div>
        </Panel>
    );
};
