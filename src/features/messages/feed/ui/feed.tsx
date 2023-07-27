import { FC, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { animated, useSpring } from 'react-spring';
import { EffectState } from 'patronum/status';
import { useUnit } from 'effector-react';
import { usersModel } from 'entities/users';
import { FeedMessage } from 'shared/lib/types';
import { Message } from './message';
import styles from './feed.module.scss';
import '../model';

export const Feed: FC<{
    data: Array<FeedMessage>;
    status: EffectState;
}> = ({ data, status }) => {
    const [atBottom, setAtBottom] = useState(true);
    const [currentUser] = useUnit([usersModel.$currentUser]);

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
    const isEmpty = data.length === 0;

    useEffect(() => {
        // todo: если atBottom === false - то нужно отобразить значок того, что новое сообщение?
        // todo#bug: срабатывает через раз
        queueMicrotask(() => {
            virtuosoRef?.current?.scrollToIndex({
                index: data.length - 1,
                behavior: 'smooth',
                align: 'start',
            });
        });
    }, [virtuosoRef, data.length]);

    return (
        <div className={styles.container}>
            {isLoading && <div className={styles.loading}>Loading...</div>}
            {isReady && isEmpty ? (
                <>Empty...</>
            ) : (
                <Virtuoso
                    ref={virtuosoRef}
                    className={styles.feed}
                    initialTopMostItemIndex={data.length - 1}
                    totalCount={data.length}
                    alignToBottom
                    atBottomThreshold={800}
                    atBottomStateChange={setAtBottom}
                    itemContent={(index) => (
                        <Message
                            key={data[index].id}
                            userId={data[index].userId}
                            text={data[index].text}
                            date={data[index].date}
                            isMy={currentUser?.id === data[index].userId}
                            prevDate={data[index - 1]?.date}
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
                            index: data.length - 1,
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
