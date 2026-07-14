import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import VideoUploadForm from '../components/VideoUploadForm';
import useVideos from '../hooks/useVideos';
import VideoGrid from '../components/VideoGrid';

const AdminPage = () => {
  const { user } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const { videos, loading, error } = useVideos('');

  // Hard redirect — non-admins cannot access this page
  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
        <p className="text-sm text-gray-500">Manage video content for all students</p>
      </header>

      <VideoUploadForm key={refreshKey} onCreated={() => setRefreshKey((k) => k + 1)} />

      <section aria-labelledby="admin-library-heading">
        <h2 id="admin-library-heading" className="text-lg font-semibold text-white mb-4">
          All Videos ({videos.length})
        </h2>
        <VideoGrid videos={videos} loading={loading} error={error} />
      </section>
    </div>
  );
};

export default AdminPage;
