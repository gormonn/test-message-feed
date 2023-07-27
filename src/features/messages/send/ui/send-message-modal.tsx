import React, {
    ChangeEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { shortcutsKeys, useHotkeys } from 'shared/lib/keyboard';
import { ValidationError } from './validation-error';
import { Modal } from './modal';
import { MAX_LEN } from './lib';
import style from './form.module.scss';
import { model } from '../model';

// todo: предупредить о потере данных при попытке выйти из модалки
export const SendMessageModal = () => {
    const [openModal, closeModal, sendingStatus, sendMessage, isModalOpen] =
        useUnit([
            model.openModal,
            model.closeModal,
            model.$sendingStatus,
            model.sendMessage,
            model.$isModalOpen,
        ]);

    const [text, setText] = useState('');
    const [isValid, setIsValid] = useState(true);

    const isInit = sendingStatus === 'initial';
    const isPending = sendingStatus === 'pending';
    const isSuccess = sendingStatus === 'done';
    const isFailed = sendingStatus === 'fail';
    const isEmpty = text.length === 0;

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

    useEffect(() => {
        if (isSuccess) {
            closeModal();
            clear();
        }
    }, [isSuccess, closeModal]);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const openHandler = useCallback(() => {
        queueMicrotask(() => textAreaRef.current?.focus());
    }, [textAreaRef]);

    useHotkeys(shortcutsKeys.openMessageForm, openModal, {
        enabled: !isModalOpen,
    });

    useHotkeys(shortcutsKeys.sendMessage, send, {
        enabled: isModalOpen && isValid && isInit && !isEmpty,
        ignoredElementWhitelist: ['TEXTAREA'],
        eventListenerOptions: { capture: true },
    });

    const onKeyDownCapture = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
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
                                  onKeyDownCapture={onKeyDownCapture}
                                  value={text}
                              />
                              <ValidationError isValid={isValid} />
                          </>
                      )
            }
            footer={
                <>
                    <button
                        disabled={!isValid || !isInit || isEmpty}
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
