import { createEffect, createEvent, restore, sample } from 'effector';
import { reset, status } from 'patronum';
import { api } from 'shared/api';

const setModalOpen = createEvent<boolean>();
const $isModalOpen = restore(setModalOpen, false);

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
    setModalOpen,
    $isModalOpen,
    $sendingStatus,
    sendMessage,
    sendMessageFx,
};
