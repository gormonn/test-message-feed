import { ReactNode } from 'react';
import { useUnit } from 'effector-react';
import { animated, useChain, useSpring, useSpringRef } from 'react-spring';
import style from './form.module.scss';
import { model } from '../model';

type ModalProps = {
    trigger: ReactNode;
    head: string | ReactNode;
    body: string | ReactNode;
    footer: string | ReactNode;
};

export const Modal = ({ trigger, head, body, footer }: ModalProps) => {
    const [setModalOpen, isModalOpen] = useUnit([
        model.setModalOpen,
        model.$isModalOpen,
    ]);

    const opacityRef = useSpringRef();
    const { opacity } = useSpring({
        ref: opacityRef,
        opacity: isModalOpen ? 1 : 0,
    });
    const displayRef = useSpringRef();
    const { display } = useSpring({
        ref: displayRef,
        display: isModalOpen ? 'flex' : 'none',
    });

    // todo: use mount/unmount instead of display:none
    useChain(
        isModalOpen
            ? [displayRef, opacityRef] // opening
            : [opacityRef, displayRef], // closing
        [0, 0],
        200,
    );

    return (
        <>
            {trigger}
            <animated.div className={style.modal} style={{ opacity, display }}>
                <div
                    className={style.overlay}
                    onClick={() => setModalOpen(false)}
                />
                <div className={style.content}>
                    <div className={style.head}>
                        {head}
                        <button
                            className={style.close}
                            onClick={() => setModalOpen(false)}
                        />
                    </div>
                    <div className={style.body}>{body}</div>
                    <div className={style.footer}>{footer}</div>
                </div>
            </animated.div>
        </>
    );
};
