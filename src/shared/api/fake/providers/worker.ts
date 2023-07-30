/// <reference lib="webworker" />
import * as Comlink from 'comlink';
import { db } from 'sw/db';
import { getFakeUsers } from 'shared/api/fake/lib';

const createUsers = async () => {
    const users = getFakeUsers(100);
    return db.users.bulkAdd(users);
};

export const WorkerMethods = {
    createUsers,
};

Comlink.expose(WorkerMethods);
