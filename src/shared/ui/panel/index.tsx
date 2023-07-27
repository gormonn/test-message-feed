import { ComponentPropsWithoutRef, FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import css from './panel.module.scss';

export const Panel: FC<PropsWithChildren<ComponentPropsWithoutRef<'div'>>> = ({
    className,
    ...props
}) => <div className={clsx(css.panel, className)} {...props} />;
