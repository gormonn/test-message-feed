import * as Comlink from 'comlink';
import type { WorkerMethods } from './worker';
import AppWorker from './worker?worker';

const workerMethods = new AppWorker();
export const workerInstance = Comlink.wrap<typeof WorkerMethods>(workerMethods);
