import { Routes, Route } from 'react-router-dom';
import { PageFeed } from 'pages/feed';
import { ProfilePage } from 'pages/profile';

export const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<PageFeed />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
    </Routes>
);
