import { useState } from 'react';
import clsx from 'clsx';
import { Nullable, User } from 'shared/lib/types';
import styles from './user.module.scss';

export const Avatar = ({ user }: { user?: Nullable<User> }) => {
    const [isReady, setIsReady] = useState(false);
    const onLoad = () => setIsReady(true);

    return (
        <div className={clsx(styles.avatarContainer, { skeleton: !isReady })}>
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
    );
};
