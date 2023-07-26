import './reset.scss';
import { FeedPage } from 'pages/feed';
import { PageLayout } from 'shared/ui/page';
import { SendMessageModal } from 'features/message-send';

function App() {
    return (
        <PageLayout>
            <FeedPage />
            <SendMessageModal />
        </PageLayout>
    );
}

export default App;
