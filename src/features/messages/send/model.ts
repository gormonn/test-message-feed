import { reset, status } from 'patronum';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { api } from 'shared/api';

const openModal = createEvent();
const closeModal = createEvent();
const $isModalOpen = createStore<boolean>(false);

sample({
    clock: openModal,
    fn: () => true,
    target: $isModalOpen,
});

sample({
    clock: closeModal,
    fn: () => false,
    target: $isModalOpen,
});

const sendMessage = createEvent<string>();
const sendMessageFx = createEffect(async (text: string) => {
    return await api.feed.sendMessage({ text });
});

const $sendingStatus = status({ effect: sendMessageFx });

reset({
    clock: $isModalOpen,
    target: $sendingStatus,
});

sample({
    clock: sendMessage,
    target: sendMessageFx,
});

export const model = {
    openModal,
    closeModal,
    $isModalOpen,
    $sendingStatus,
    sendMessage,
    sendMessageFx,
};
