import styles from 'features/messages/feed/ui/message.module.scss';
import { Link } from 'react-router-dom';
import { useStoreMap } from 'effector-react';
import { usersModel } from 'entities/users';
import clsx from 'clsx';
import { useState } from 'react';

export const UserLink = ({ userId }: { userId: string }) => {
    const user = useStoreMap(usersModel.$usersMap, (users) =>
        users.get(userId),
    );

    const [isReady, setIsReady] = useState(false);
    const onLoad = () => setIsReady(true);

    return (
        <Link
            className={styles.user}
            to={`/user/${user?.id}`}
            onClick={(e) => {
                if (!user) e.preventDefault();
            }}
        >
            <div
                className={clsx(styles.avatarContainer, { skeleton: !isReady })}
            >
                {user && (
                    <img
                        className={clsx(styles.avatar, {
                            [styles.ready]: isReady,
                        })}
                        src={
                            user?.avatar ||
                            `https://avatar.oxro.io/avatar.svg?name=${user?.firstName}+${user?.lastName}`
                        }
                        alt="avatar"
                        loading="lazy"
                        onLoad={onLoad}
                    />
                )}
            </div>
            <b className={styles.name}>
                {user ? (
                    `${user.firstName} ${user.lastName}`
                ) : (
                    <div
                        className="skeleton"
                        style={{ width: '9rem', height: '1.5rem' }}
                    />
                )}
            </b>
        </Link>
    );
    // ) : (
    //     <div className={styles.user}>
    //         <div className={clsx(styles.avatar, 'skeleton')} />
    //         <div
    //             className="skeleton"
    //             style={{ width: '9rem', height: '1.5rem' }}
    //         />
    //     </div>
    // );
};
