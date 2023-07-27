import { Feed } from 'features/messages/feed';
import { SendMessageModal } from 'features/messages/send';
import { useUnit } from 'effector-react';
import { feedModel } from 'entities/feed';

export const PageFeed = () => {
    const [feed, status] = useUnit([feedModel.$feed, feedModel.$getFeedStatus]);
    return (
        <>
            <Feed data={feed} status={status} />
            <SendMessageModal />
        </>
    );
};
