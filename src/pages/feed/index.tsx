import { Feed } from 'features/messages/feed';
import { SendMessageModal } from 'features/messages/send';

export const PageFeed = () => {
    return (
        <>
            <Feed />
            <SendMessageModal />
        </>
    );
};
