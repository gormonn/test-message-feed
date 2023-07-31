import { useState } from 'react';
import clsx from 'clsx';
import { isSameDay } from 'date-fns/esm/fp';
import { useUnit } from 'effector-react';
import { filterModel } from 'features/messages/filter';
import { getISODay, getISOTime } from 'shared/lib/date';
import { Highlighter } from 'shared/lib/text';
import { FeedMessage } from 'shared/lib/types';
import styles from './message.module.scss';
import { UserLink } from './user-link';

type MessageProps = Omit<FeedMessage, 'id'> & {
    prevDate: string;
    isMy: boolean;
};

// todo: add hightlight component for search
// todo: добавить прелоадеры
// todo: добавить статусы sending / delivered / seen / error
export const Message = (props: MessageProps) => {
    const search = useUnit(filterModel.$textFilterDeb);
    const [isNextDay] = useState(
        () => !isSameDay(new Date(props.date), new Date(props.prevDate)),
    );

    return (
        <>
            {isNextDay && (
                <div className={styles.daySplit}>
                    <span className={styles.text}>{getISODay(props.date)}</span>
                </div>
            )}
            <div
                className={clsx(styles.container, {
                    [styles.isMy]: props.isMy,
                })}
            >
                <div className={styles.message}>
                    <UserLink userId={props.userId} />
                    <div className={styles.text}>
                        <Highlighter
                            searchWords={[search]}
                            textToHighlight={props.text}
                        />
                    </div>
                    <div className={styles.date}>{getISOTime(props.date)}</div>
                </div>
            </div>
        </>
    );
};
