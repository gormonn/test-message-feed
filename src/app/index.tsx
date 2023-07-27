import { PageLayout } from 'shared/ui/page';
import { AppRoutes } from 'app/routes';
import './reset.scss';
import './animation.scss';

export default function App() {
    return (
        <PageLayout>
            <AppRoutes />
        </PageLayout>
    );
}
