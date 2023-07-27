import clsx from 'clsx';
import { ErrorIcon } from 'shared/ui/icons';
import { MAX_LEN } from './lib';
import style from './form.module.scss';

export const ValidationError = ({ isValid }: { isValid: boolean }) => (
    <span
        className={clsx(style.errorText, {
            [style.show]: !isValid,
        })}
    >
        <ErrorIcon />
        Exceeded maximum character length of {MAX_LEN}
    </span>
);
