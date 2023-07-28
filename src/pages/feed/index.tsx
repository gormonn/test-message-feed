import { Feed } from 'features/messages/feed';
import { messageSendModel, SendMessageModal } from 'features/messages/send';
import { filterModel, FilterPanel } from 'features/messages/filter';
import { useUnit } from 'effector-react';
import { feedModel } from 'entities/feed';
import style from './feed-page.module.scss';
import { Panel } from 'shared/ui/panel';

export const PageFeed = () => {
    const [openModal, feed, status, filteredFeed, filteredStatus, filters] =
        useUnit([
            messageSendModel.openModal,
            feedModel.$feed,
            feedModel.$getFeedStatus,
            feedModel.$filteredFeed,
            feedModel.$getFilteredFeedStatus,
            filterModel.$filters,
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
                <Feed
                    data={filters ? filteredFeed : feed}
                    status={filters ? filteredStatus : status}
                />
            </div>
            <SendMessageModal />
        </>
    );
};
