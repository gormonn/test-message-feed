import { useCallback } from 'react';
import { useGate } from 'effector-react';
import { workerInstance } from 'sw';
import { AppRoutes } from 'app/routes';
import { feedModel } from 'entities/feed';
import { usersModel } from 'entities/users';
import { PageLayout } from 'shared/ui/page';
import './reset.scss';
import './animation.scss';

export default function App() {
    useGate(feedModel.load);
    useGate(usersModel.loadMe);

    const workerCall = useCallback(async () => {
        const res = await workerInstance.blockingFunc();
        console.log(res, 'res');
    }, []);

    // const normalFuncCall = useCallback(() => {
    //     const res = blockingFunc();
    //     console.log(res, 'res');
    // }, []);

    return (
        <PageLayout>
            <section>
                <button onClick={workerCall}>Worker Call</button>
                {/*<button onClick={normalFuncCall}>Main Thread Call</button>*/}
            </section>
            <AppRoutes />
        </PageLayout>
    );
}
