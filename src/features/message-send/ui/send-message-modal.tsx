import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { ValidationError } from './validation-error';
import { Modal } from './modal';
import { MAX_LEN } from './lib';
import style from './form.module.scss';
import { model } from '../model';
import { useKeyUp } from 'shared/lib/hooks/use-key-up';

// todo: предупредить о потере данных при попытке выйти из модалки
export const SendMessageModal = () => {
    const [setModalOpen, sendingStatus, sendMessage, isModalOpen] = useUnit([
        model.setModalOpen,
        model.$sendingStatus,
        model.sendMessage,
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
            clear();
            // либо предложить "отправить еще"
        }
    }, [isSuccess, setModalOpen]);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useKeyUp(() => {
        setModalOpen(true);
    }, 'Enter');

    const openHandler = useCallback(() => {
        queueMicrotask(() => textAreaRef.current?.focus());
    }, [textAreaRef]);

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Send Message</button>
            <Modal
                openHandler={openHandler}
                head={<h3>Send Message</h3>}
                body={
                    isFailed
                        ? 'Something went wrong'
                        : isModalOpen && (
                              <>
                                  <textarea
                                      ref={textAreaRef}
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
        </>
    );
};
