import { useGate, useUnit } from 'effector-react';
import { feedModel } from 'entities/feed';
import { Message } from 'features/feed/ui/message';
import styles from './ui/styles.module.scss';
import { usersModel } from 'entities/users';

export const FeedPage = () => {
    useGate(feedModel.load);
    useGate(usersModel.loadMe);

    const [feed, currentUser] = useUnit([
        feedModel.$feed,
        usersModel.$currentUser,
    ]);

    return (
        <div className={styles.feed}>
            {feed.map((message, i, arr) => (
                <Message
                    key={message.id}
                    userId={message.userId}
                    text={message.text}
                    date={message.date}
                    prevDate={arr[i - 1]?.date}
                    isMy={currentUser?.id === message.userId}
                />
            ))}
        </div>
    );
};
