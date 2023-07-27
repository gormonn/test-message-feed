import { Nullable, User } from 'shared/lib/types';
import styles from './user.module.scss';

export const FullName = ({ user }: { user?: Nullable<User> }) => (
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
);
