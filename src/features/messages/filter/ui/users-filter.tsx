import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated } from 'react-spring';
import useOnClickOutside from 'use-onclickoutside';
import { useUnit } from 'effector-react';
import { model } from '../model';
import css from './filter-panel.module.scss';

export const UsersFilter = () => {
    const [
        setUsersToFind,
        usersToFind,
        selectUser,
        foundUsersView,
        openFoundUsers,
        closeFoundUsers,
        isOpenFoundUsers,
    ] = useUnit([
        model.setUsersToFind,
        model.$usersToFind,
        model.selectUser,
        model.$foundUsersView,
        model.openFoundUsers,
        model.closeFoundUsers,
        model.$isOpenFoundUsers,
    ]);

    // todo: on resize bug (fix or use floating-ui)
    const inputRef = useRef<HTMLInputElement>(null);
    const [rect, setRect] = useState<DOMRect | undefined>();
    useEffect(() => {
        setRect(inputRef?.current?.getBoundingClientRect());
    }, [inputRef]);
    // const [rect, inputRef] = useRect();

    const selectRef = useRef(null);
    useOnClickOutside(selectRef, closeFoundUsers);

    const { opacity } = useSpring({
        opacity: isOpenFoundUsers && foundUsersView.length > 0 ? 1 : 0,
    });

    return (
        <>
            <label className={css.col}>
                Filter By Users:
                <input
                    ref={inputRef}
                    className={css.input}
                    type="text"
                    onChange={(e) => setUsersToFind(e.target.value)}
                    value={usersToFind}
                    onFocus={openFoundUsers}
                />
            </label>
            {isOpenFoundUsers &&
                createPortal(
                    <animated.div
                        ref={selectRef}
                        className={css.users}
                        style={{
                            opacity,
                            position: 'absolute',
                            top: rect ? rect.top + rect.height : 'unset',
                            left: rect ? rect.left : 'unset',
                            width: rect?.width,
                        }}
                    >
                        {foundUsersView.map((item) => (
                            <div
                                key={item.id}
                                className={css.user}
                                onClick={() => selectUser(item)}
                            >
                                {item.firstName} {item.lastName}
                            </div>
                        ))}
                    </animated.div>,
                    document.body,
                )}
        </>
    );
};
