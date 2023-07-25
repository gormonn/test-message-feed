export const users = {
    get: (userId: string) => {},
    getMessages: (userId: string) => {},
    getMe: () => {},
    getMyMessages: () => {},
};

type FeedNewMessagePayload = {
    text: string;
    user: string;
};
type FeedFilterPayload = {
    users?: string[];
    text?: string;
};

export const feed = {
    get: () => {},
    newMessage: (payload: FeedNewMessagePayload) => {},
    filter: (payload: FeedFilterPayload) => {},
};
