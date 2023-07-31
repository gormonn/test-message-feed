import clsx from 'clsx';
import { ErrorIcon } from 'shared/ui/icons';
import css from './form.module.scss';
import { MAX_LEN } from './lib';

export const ValidationError = ({ isValid }: { isValid: boolean }) => (
    <span
        className={clsx(css.errorText, {
            [css.show]: !isValid,
        })}
    >
        <ErrorIcon />
        Exceeded maximum character length of {MAX_LEN}
    </span>
);
