import { Link } from 'react-router-dom';

const ProgressItem = ({ item }) => {
  const { video, watchedSeconds, completed } = item;
  const pct = video?.duration > 0
    ? Math.min(Math.round((watchedSeconds / video.duration) * 100), 100)
    : 0;

  return (
    <li className="card p-4 flex gap-4 items-center hover:border-brand-600/40 transition-colors">
      {/* Thumbnail */}
      {video?.thumbnail && (
        <img src={video.thumbnail} alt={video.title} className="w-20 h-12 object-cover rounded-lg shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <Link to={`/videos/${video?._id}`} className="text-sm font-medium text-white hover:text-brand-400 truncate block">
          {video?.title}
        </Link>
        <div className="mt-1.5 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${completed ? 'bg-green-500' : 'bg-brand-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {completed ? '✅ Completed' : `${pct}% watched`}
        </p>
      </div>
    </li>
  );
};

export default ProgressItem;
