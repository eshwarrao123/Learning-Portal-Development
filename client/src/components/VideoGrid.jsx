import VideoCard from './VideoCard';
import Spinner from './ui/Spinner';

const VideoGrid = ({ videos, loading, error }) => {
  if (loading) return (
    <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  );

  if (error) return (
    <p className="text-center text-red-400 py-10">{error}</p>
  );

  if (!videos.length) return (
    <p className="text-center text-gray-500 py-10">No videos found.</p>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((v) => <VideoCard key={v._id} video={v} />)}
    </div>
  );
};

export default VideoGrid;
