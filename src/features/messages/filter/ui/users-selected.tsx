import { model } from 'features/messages/filter/model';
import { useUnit } from 'effector-react';
import css from './filter-panel.module.scss';

export const UsersSelected = () => {
    const [removeUser, selectedUsers] = useUnit([
        model.removeUser,
        model.$selectedUsersView,
    ]);

    return (
        <div className={css.col}>
            Filter by users:
            <div
                className={css.users}
                style={{ overflow: 'auto', maxHeight: 104, width: 200 }}
            >
                {selectedUsers.map((user) => (
                    <div
                        className={css.user}
                        onClick={() => removeUser(user.id)}
                    >
                        {user.firstName} {user.lastName}
                    </div>
                ))}
            </div>
        </div>
    );
};
