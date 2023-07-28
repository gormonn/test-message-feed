/// <reference lib="webworker" />
import * as Comlink from 'comlink';

const blockingFunc = () => {
    new Array(100_000_000)
        .map((elm, index) => elm + index)
        .reduce((acc, cur) => acc + cur, 0);
    return 'aba';
};

export const WorkerMethods = {
    blockingFunc,
};

Comlink.expose(WorkerMethods);

// export  methods;
