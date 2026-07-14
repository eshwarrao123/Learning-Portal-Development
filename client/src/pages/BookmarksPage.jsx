import { useState, useEffect } from 'react';
import api from '../utils/api';
import VideoGrid from '../components/VideoGrid';

const BookmarksPage = () => {
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      try {
        // Get distinct bookmarked videos
        const { data } = await api.get('/bookmarks');
        const uniqueVideos = Array.from(
          new Map(data.data.map((b) => [b.video?._id, b.video])).values()
        ).filter(Boolean);
        if (!cancelled) setVideos(uniqueVideos);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-bold text-white mb-1">Bookmarks</h1>
        <p className="text-sm text-gray-500">Videos you've bookmarked timestamps in</p>
      </header>
      <VideoGrid videos={videos} loading={loading} error={error} />
    </div>
  );
};

export default BookmarksPage;
