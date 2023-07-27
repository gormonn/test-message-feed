import { PageLayout } from 'shared/ui/page';
import { AppRoutes } from 'app/routes';
import { useGate } from 'effector-react';
import { feedModel } from 'entities/feed';
import { usersModel } from 'entities/users';
import './reset.scss';
import './animation.scss';

export default function App() {
    useGate(feedModel.load);
    useGate(usersModel.loadMe);

    return (
        <PageLayout>
            <AppRoutes />
        </PageLayout>
    );
}
