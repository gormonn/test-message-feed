import { FC, PropsWithChildren } from 'react';
import style from './page.module.scss';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => (
    <div className={style.page}>{children}</div>
);
