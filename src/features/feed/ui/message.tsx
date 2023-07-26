import { useState } from 'react';
import { useGate, useStoreMap } from 'effector-react';
import { isSameDay } from 'date-fns/esm/fp';
import { usersModel } from 'entities/users';
import { FeedMessage } from 'shared/lib/types';
import { getISODay, getISOTime } from 'shared/lib/date';
import styles from './style.module.scss';
import clsx from 'clsx';

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

    const user = useStoreMap(usersModel.$usersMap, (users) => {
        return users.get(props.userId);
    });

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
                    <div className={styles.user}>
                        <img
                            className={styles.avatar}
                            src={
                                user?.avatar ||
                                `https://avatar.oxro.io/avatar.svg?name=${user?.firstName}+${user?.lastName}`
                            }
                            alt="avatar"
                        />
                        <b className={styles.name}>
                            {/*todo: добавить прелоадер */}
                            {user?.firstName} {user?.lastName}
                        </b>
                    </div>
                    <div className={styles.text}>{props.text}</div>
                    <div className={styles.date}>{getISOTime(props.date)}</div>
                </div>
            </div>
        </>
    );
};
