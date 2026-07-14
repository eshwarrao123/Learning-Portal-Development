import Badge from './ui/Badge';

const formatDuration = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`;
};

const VideoInfo = ({ video }) => (
  <div className="flex flex-col gap-3 mt-4">
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="brand">{video.category}</Badge>
      <span className="text-xs text-gray-500">{formatDuration(video.duration)}</span>
    </div>
    <h1 className="text-xl font-bold text-white">{video.title}</h1>
    <p className="text-sm text-gray-400 leading-relaxed">{video.description}</p>
  </div>
);

export default VideoInfo;
