import { createEffect, createEvent, restore, sample } from 'effector';
import { api } from 'shared/api';
import { status } from 'patronum';

const setModalOpen = createEvent<boolean>();
const $isModalOpen = restore(setModalOpen, true);

const sendMessage = createEvent<string>();
const sendMessageFx = createEffect(async (text: string) => {
    return await api.feed.sendMessage({ text });
});

sample({
    clock: sendMessage,
    target: sendMessageFx,
});

const $sendingStatus = status({ effect: sendMessageFx });

export const model = {
    setModalOpen,
    $isModalOpen,
    sendMessage,
    $sendingStatus,
};
