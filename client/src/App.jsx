import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoute  from './components/routing/PublicRoute';
import PrivateRoute from './components/routing/PrivateRoute';
import Layout       from './components/Layout';

import LoginPage      from './pages/LoginPage';
import RegisterPage   from './pages/RegisterPage';
import DashboardPage  from './pages/DashboardPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import BookmarksPage  from './pages/BookmarksPage';
import ProfilePage    from './pages/ProfilePage';
import AdminPage      from './pages/AdminPage';

const App = () => (
  <Routes>
    {/* Public */}
    <Route element={<PublicRoute />}>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    {/* Private */}
    <Route element={<PrivateRoute />}>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/videos/:id" element={<VideoPlayerPage />} />
        <Route path="/bookmarks"  element={<BookmarksPage />} />
        <Route path="/profile"    element={<ProfilePage />} />
        <Route path="/admin"      element={<AdminPage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
