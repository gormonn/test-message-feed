import { useGate, useStoreMap } from 'effector-react';
import { Nullable, User } from 'shared/lib/types';
import { model } from '../model';

export const useUser = (userId?: string): Nullable<User> | undefined => {
    useGate(model.loadUser, userId);
    return useStoreMap(model.$usersMap, (users) =>
        userId ? users.get(userId) : null,
    );
};
