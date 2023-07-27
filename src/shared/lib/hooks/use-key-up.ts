import { useCallback, useEffect } from 'react';

const KEY_NAME_ESC = 'Escape';
const KEY_EVENT_TYPE = 'keyup';

export function useKeyUp(handleClose: () => void, key = KEY_NAME_ESC) {
    const handleEscKey = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === key) {
                handleClose();
            }
        },
        [handleClose, key],
    );

    useEffect(() => {
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);
}
