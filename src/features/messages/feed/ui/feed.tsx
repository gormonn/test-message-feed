import { useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { animated, useSpring } from 'react-spring';
import { useGate, useUnit } from 'effector-react';
import { feedModel } from 'entities/feed';
import { usersModel } from 'entities/users';
import { Message } from './message';
import styles from './feed.module.scss';
import '../model';

export const Feed = () => {
    useGate(feedModel.load);
    useGate(usersModel.loadMe);

    const [atBottom, setAtBottom] = useState(true);
    const [feed, status, currentUser] = useUnit([
        feedModel.$feed,
        feedModel.$getFeedStatus,
        usersModel.$currentUser,
    ]);

    const spring = useSpring({
        from: {
            opacity: 0,
        },
        to: {
            transform: atBottom ? 'translateY(5rem)' : 'translateY(0)',
            opacity: atBottom ? 0 : 1,
        },
    });

    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const isLoading = status === 'initial' || status === 'pending';
    const isReady = status === 'done' || status === 'fail';
    const isEmpty = feed.length === 0;

    useEffect(() => {
        // todo: если atBottom === false - то нужно отобразить значок того, что новое сообщение?
        // todo#bug: срабатывает через раз
        queueMicrotask(() => {
            virtuosoRef?.current?.scrollToIndex({
                index: feed.length - 1,
                behavior: 'smooth',
                align: 'start',
            });
        });
    }, [virtuosoRef, feed.length]);

    return (
        <div className={styles.container}>
            {isLoading && <div className={styles.loading}>Loading...</div>}
            {isReady && isEmpty ? (
                <>Empty...</>
            ) : (
                <Virtuoso
                    ref={virtuosoRef}
                    className={styles.feed}
                    initialTopMostItemIndex={feed.length - 1}
                    totalCount={feed.length}
                    alignToBottom
                    atBottomThreshold={800}
                    atBottomStateChange={setAtBottom}
                    itemContent={(index) => (
                        <Message
                            key={feed[index].id}
                            userId={feed[index].userId}
                            text={feed[index].text}
                            date={feed[index].date}
                            isMy={currentUser?.id === feed[index].userId}
                            prevDate={feed[index - 1]?.date}
                        />
                    )}
                />
            )}
            {isReady && !isEmpty && (
                <animated.button
                    className={styles.back}
                    style={spring}
                    onClick={() =>
                        virtuosoRef?.current?.scrollToIndex({
                            index: feed.length - 1,
                            behavior: 'smooth',
                        })
                    }
                >
                    Down
                </animated.button>
            )}
        </div>
    );
};
