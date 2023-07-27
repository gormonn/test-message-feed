import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { User, usersModel, useUser } from 'entities/users';
import { feedModel } from 'entities/feed';
import style from './profile.module.scss';
import { Feed } from 'features/messages/feed';
import clsx from 'clsx';
import { FilterPanel } from 'features/messages/filter';
import { Panel } from 'shared/ui/panel';

export const ProfilePage: FC = () => {
    const { userId } = useParams();
    const user = useUser(userId);

    const [getUserFeed, data, status, currentUser] = useUnit([
        feedModel.getFilteredFeed,
        feedModel.$filteredFeed,
        feedModel.$getFilteredFeedStatus,
        usersModel.$currentUser,
    ]);

    useEffect(() => {
        if (userId) {
            getUserFeed({ users: [userId] });
        }
    }, [userId, getUserFeed]);

    return (
        <div className={style.profile}>
            <div
                className={clsx(style.wrap, {
                    [style.me]: userId === currentUser?.id,
                })}
            >
                <FilterPanel className={style.container} />
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
            <Feed data={data} status={status} />
        </div>
    );
};
