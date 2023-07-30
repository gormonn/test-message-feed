import Dexie, { Table } from 'dexie';
import { FeedMessage, User } from 'shared/lib/types';

export class MySubClassedDexie extends Dexie {
    users!: Table<User>;
    feed!: Table<FeedMessage>;

    constructor() {
        super('mock-data');
        this.version(3).stores({
            users: 'id, firstName, lastName, bio, avatar',
            feed: 'id, date, text, userId',
        });
    }
}

export const db = new MySubClassedDexie();
