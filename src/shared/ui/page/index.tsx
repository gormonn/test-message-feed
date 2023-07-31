import { FC, PropsWithChildren } from 'react';
import css from './page.module.scss';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className={css.page}>{children}</div>
);
