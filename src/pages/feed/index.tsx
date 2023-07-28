import { useUnit } from 'effector-react';
import { Feed } from 'features/messages/feed';
import { filterModel, FilterPanel } from 'features/messages/filter';
import { messageSendModel, SendMessageModal } from 'features/messages/send';
import { feedModel } from 'entities/feed';
import { Panel } from 'shared/ui/panel';
import css from './feed-page.module.scss';

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
            <div className={css.page}>
                <div className={css.wrap}>
                    <FilterPanel />
                    <Panel>
                        <button className={css.btn} onClick={openModal}>
                            New Message
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
