import { Gender } from 'shared/lib/types/enum';

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    gender: Gender;
};
