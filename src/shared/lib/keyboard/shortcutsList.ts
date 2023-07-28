import type { KeyboardEventKey } from 'keyboard-event-key-type';

type ShortcutGetter = {
    [key: string]: KeyboardEventKey[];
};

export const shortcutsList: ShortcutGetter = {
    openMessageForm: ['Meta', 'Enter'], // todo: meta on mac - Command, what key is this on windows?
    sendMessage: ['Enter'],
    close: ['Escape'],
    search: ['Meta', 'Shift', 'F'],
};

export const shortcutsKeys: ShortcutGetter = new Proxy(shortcutsList, {
    get(target, property) {
        const shortcut = Reflect.get(target, property);
        if (Array.isArray(shortcut)) {
            return shortcut.join('+');
        }
        return undefined;
    },
});
