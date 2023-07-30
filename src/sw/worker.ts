/// <reference lib="webworker" />
import * as Comlink from 'comlink';

const blockingFunc = () => {
    return new Array(100_000_000)
        .map((elm, index) => elm + index)
        .reduce((acc, cur) => acc + cur, 0);
};

export const WorkerMethods = {
    blockingFunc,
};

Comlink.expose(WorkerMethods);
