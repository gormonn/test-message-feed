import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { Feed } from 'features/messages/feed';
import { FilterPanel } from 'features/messages/filter';
import { feedModel } from 'entities/feed';
import { User, usersModel, useUser } from 'entities/users';
import { Panel } from 'shared/ui/panel';
import style from './profile.module.scss';

export const ProfilePage: FC = () => {
    const { userId } = useParams();
    const user = useUser(userId);

    const [getFilteredFeed, filteredData, filteredStatus, currentUser] =
        useUnit([
            feedModel.getFilteredFeed,
            feedModel.$filteredFeed,
            feedModel.$getFilteredFeedStatus,
            usersModel.$currentUser,
        ]);

    useEffect(() => {
        if (userId) {
            getFilteredFeed({ users: [userId] });
        }
    }, [userId, getFilteredFeed]);

    if (!user) return <>Loading user...</>;
    return (
        <div className={style.profile}>
            <div
                className={clsx(style.wrap, {
                    [style.me]: userId === currentUser?.id,
                })}
            >
                <FilterPanel
                    className={style.container}
                    defaultFilters={{ and: true, users: [user.id] }}
                />
                <Panel>
                    <User.Container>
                        <User.Avatar user={user} />
                        <User.FullName user={user} />
                    </User.Container>
                    <div className={style.info}>
                        <div className={style.info__item}>
                            <b>Bio:</b>
                            <i>{user?.bio}</i>
                        </div>
                    </div>
                </Panel>
            </div>
            <Feed data={filteredData} status={filteredStatus} />
        </div>
    );
};
