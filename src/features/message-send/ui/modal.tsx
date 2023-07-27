import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react';
import { useUnit } from 'effector-react';
import { animated, useChain, useSpring, useSpringRef } from 'react-spring';
import { shortcutsKeys, useHotkeys } from 'shared/lib/keyboard';
import style from './form.module.scss';
import { model } from '../model';

type ModalProps = {
    head: string | ReactNode;
    body: string | ReactNode;
    footer: string | ReactNode;
    openHandler?: () => void;
};

export const Modal = forwardRef<
    HTMLDivElement,
    ComponentPropsWithoutRef<'div'> & ModalProps
>(({ head, body, footer, openHandler }, ref) => {
    const [closeModal, isModalOpen] = useUnit([
        model.closeModal,
        model.$isModalOpen,
    ]);

    const opacityRef = useSpringRef();
    const { opacity } = useSpring({
        ref: opacityRef,
        opacity: isModalOpen ? 1 : 0,
        precision: 0.0001,
        clamp: true,
    });

    const displayRef = useSpringRef();
    const { display } = useSpring({
        ref: displayRef,
        display: isModalOpen ? 'flex' : 'none',
        onRest: ({ value }) => {
            if (value.display === 'flex') {
                openHandler?.();
            }
        },
    });

    // todo: use mount/unmount instead of display:none
    useChain(
        isModalOpen
            ? [displayRef, opacityRef] // opening
            : [opacityRef, displayRef], // closing
        [0, 0],
        200,
    );

    useHotkeys(shortcutsKeys.close, closeModal, {
        enabled: isModalOpen,
    });

    return (
        <animated.div
            ref={ref}
            className={style.modal}
            style={{ opacity, display }}
        >
            <div tabIndex={-1} className={style.overlay} onClick={closeModal} />
            <div className={style.content}>
                <div className={style.head}>
                    {head}
                    <button className={style.close} onClick={closeModal} />
                </div>
                <div className={style.body}>{body}</div>
                <div className={style.footer}>{footer}</div>
            </div>
        </animated.div>
    );
});
