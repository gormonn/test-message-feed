import { useUnit } from 'effector-react';
import { model } from '../model';
import css from './filter-panel.module.scss';

export const UsersSelected = () => {
    const [removeUser, selectedUsers] = useUnit([
        model.removeUser,
        model.$selectedUsersView,
    ]);

    return selectedUsers.length ? (
        <div className={css.col}>
            Filter by Users:
            <div
                className={css.users}
                style={{ overflow: 'auto', maxHeight: 104, width: 200 }}
            >
                {selectedUsers.map((user) => (
                    <button
                        key={user.id}
                        type="button"
                        className={css.user}
                        onClick={() => removeUser(user.id)}
                    >
                        {user.firstName} {user.lastName}
                        <span>x</span>
                    </button>
                ))}
            </div>
        </div>
    ) : null;
};
