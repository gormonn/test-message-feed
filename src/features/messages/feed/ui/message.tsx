import { useState } from 'react';
import { useGate } from 'effector-react';
import clsx from 'clsx';
import { isSameDay } from 'date-fns/esm/fp';
import { usersModel } from 'entities/users';
import { FeedMessage } from 'shared/lib/types';
import { getISODay, getISOTime } from 'shared/lib/date';
import { UserLink } from './user-link';
import styles from './message.module.scss';

type MessageProps = Omit<FeedMessage, 'id'> & {
    prevDate: string;
    isMy: boolean;
};

// todo: add hightlight component for search
// todo: добавить прелоадеры
// todo: добавить статусы sending / delivered / seen / error
export const Message = (props: MessageProps) => {
    useGate(usersModel.loadUser, props.userId);

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
                    <div className={styles.text}>{props.text}</div>
                    <div className={styles.date}>{getISOTime(props.date)}</div>
                </div>
            </div>
        </>
    );
};
