import { User } from 'shared/lib/types';

export const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;
