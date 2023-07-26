import { ChangeEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { ValidationError } from './validation-error';
import { MAX_LEN } from './lib';
import style from './form.module.scss';
import { model } from '../model';
import { Modal } from 'features/message-send/ui/modal';

// todo: предупредить о потере данных при попытке выйти из модалки
export const SendMessageModal = () => {
    const [setModalOpen, sendMessage, sendingStatus] = useUnit([
        model.setModalOpen,
        model.sendMessage,
        model.$sendingStatus,
        model.$isModalOpen,
    ]);

    const [text, setText] = useState('');
    const [isValid, setIsValid] = useState(true);

    const inputHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setText(value);
        setIsValid(value.length <= MAX_LEN);
    };

    const send = () => {
        sendMessage(text);
    };

    const clear = () => {
        setText('');
        setIsValid(true);
    };

    const isInit = sendingStatus === 'initial';
    const isPending = sendingStatus === 'pending';
    const isSuccess = sendingStatus === 'done';
    const isFailed = sendingStatus === 'fail';

    useEffect(() => {
        if (isSuccess) {
            setModalOpen(false);
            // либо предложить "отправить еще"
        }
    }, [isSuccess, setModalOpen]);

    return (
        <Modal
            trigger={
                <button onClick={() => setModalOpen(true)}>Send Message</button>
            }
            head={<h3>Send Message</h3>}
            body={
                isFailed ? (
                    'Something went wrong'
                ) : (
                    <>
                        <textarea
                            className={clsx(style.textArea, {
                                [style.error]: !isValid,
                            })}
                            onChange={inputHandler}
                            value={text}
                        />
                        <ValidationError isValid={isValid} />
                    </>
                )
            }
            footer={
                <>
                    <button
                        disabled={!isValid || !isInit || text.length === 0}
                        onClick={send}
                    >
                        {isInit && 'Send'}
                        {isPending && 'Sending...'}
                        {isSuccess && 'Done!'}
                        {isFailed && 'Failed!'}
                    </button>
                    <span
                        className={clsx(style.counter, {
                            [style.error]: !isValid,
                        })}
                    >
                        {text.length}/{MAX_LEN}
                    </span>
                    <button onClick={clear}>Clear</button>
                </>
            }
        />
    );
};
