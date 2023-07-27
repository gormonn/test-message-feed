import { Feed } from 'features/messages/feed';
import { messageSendModel, SendMessageModal } from 'features/messages/send';
import { FilterPanel } from 'features/messages/filter';
import { useUnit } from 'effector-react';
import { feedModel } from 'entities/feed';
import style from './feed-page.module.scss';
import { Panel } from 'shared/ui/panel';

export const PageFeed = () => {
    const [openModal, feed, status] = useUnit([
        messageSendModel.openModal,
        feedModel.$feed,
        feedModel.$getFeedStatus,
    ]);
    return (
        <>
            <div className={style.page}>
                <div className={style.wrap}>
                    <FilterPanel />
                    <Panel>
                        <button className={style.btn} onClick={openModal}>
                            Send Message
                        </button>
                    </Panel>
                </div>
                <Feed data={feed} status={status} />
            </div>
            <SendMessageModal />
        </>
    );
};
