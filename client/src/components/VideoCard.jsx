import { Link } from 'react-router-dom';
import Badge from './ui/Badge';

const formatDuration = (secs) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

const VideoCard = ({ video }) => (
  <Link
    to={`/videos/${video._id}`}
    className="card group flex flex-col overflow-hidden hover:border-brand-600/50 hover:shadow-brand-600/10 hover:shadow-xl transition-all duration-200"
  >
    {/* Thumbnail */}
    <div className="relative aspect-video bg-gray-800 overflow-hidden">
      {video.thumbnail ? (
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">▶</div>
      )}
      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
        {formatDuration(video.duration)}
      </span>
    </div>

    {/* Info */}
    <div className="flex flex-col gap-2 p-4">
      <Badge variant="brand">{video.category}</Badge>
      <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-brand-400 transition-colors">
        {video.title}
      </h3>
    </div>
  </Link>
);

export default VideoCard;
