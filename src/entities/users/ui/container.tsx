import { FC, PropsWithChildren } from 'react';
import styles from './user.module.scss';

export const Container: FC<PropsWithChildren> = ({ children }) => (
    <div className={styles.user}>{children}</div>
);
