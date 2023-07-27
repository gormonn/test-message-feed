import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { User, usersModel, useUser } from 'entities/users';
import { feedModel } from 'entities/feed';
import style from './profile.module.scss';
import { Feed } from 'features/messages/feed';
import clsx from 'clsx';

export const ProfilePage = () => {
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
            <Feed data={data} status={status} />
            <div
                className={clsx(style.wrap, {
                    [style.me]: userId === currentUser?.id,
                })}
            >
                <div className={style.container}>
                    <User.Container>
                        <User.Avatar user={user} />
                        <User.FullName user={user} />
                    </User.Container>
                    <div className={style.info}>
                        <div className={style.info__item}>
                            <b className={style.info__item_label}>Bio:</b>
                            <i className={style.info__item_value}>
                                {user?.bio}
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
