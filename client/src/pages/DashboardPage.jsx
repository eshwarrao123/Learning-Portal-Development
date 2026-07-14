import { useState } from 'react';
import useVideos from '../hooks/useVideos';
import useContinueWatching from '../hooks/useContinueWatching';
import CategoryFilter from '../components/CategoryFilter';
import VideoGrid from '../components/VideoGrid';
import ProgressItem from '../components/ProgressItem';

const DashboardPage = () => {
  const [category, setCategory] = useState('');
  const { videos, loading, error } = useVideos(category);
  const { items: continueItems }   = useContinueWatching();

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Explore your MERN learning materials</p>
      </header>

      {/* Continue watching rail */}
      {continueItems.length > 0 && (
        <section aria-labelledby="continue-heading">
          <h2 id="continue-heading" className="text-lg font-semibold text-white mb-4">Continue Watching</h2>
          <ul className="flex flex-col gap-3">
            {continueItems.slice(0, 4).map((item) => (
              <ProgressItem key={item._id} item={item} />
            ))}
          </ul>
        </section>
      )}

      {/* Library */}
      <section aria-labelledby="library-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 id="library-heading" className="text-lg font-semibold text-white">Video Library</h2>
          <CategoryFilter selected={category} onChange={setCategory} />
        </div>
        <VideoGrid videos={videos} loading={loading} error={error} />
      </section>
    </div>
  );
};

export default DashboardPage;
