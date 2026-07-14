import Button from './ui/Button';

const formatTime = (secs) => {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const BookmarkItem = ({ bookmark, onSeek, onDelete }) => (
  <li className="flex items-center gap-3 group py-2 border-b border-gray-800 last:border-0">
    {/* Clickable timestamp */}
    <button
      onClick={() => onSeek(bookmark.timestamp)}
      className="flex items-center gap-2 flex-1 text-left hover:text-brand-400 transition-colors"
      aria-label={`Seek to ${formatTime(bookmark.timestamp)}`}
    >
      <span className="font-mono text-xs bg-gray-800 text-brand-400 px-2 py-0.5 rounded shrink-0">
        {formatTime(bookmark.timestamp)}
      </span>
      <span className="text-sm text-gray-300 truncate">
        {bookmark.name || 'Bookmark'}
      </span>
    </button>

    <Button
      variant="icon"
      onClick={() => onDelete(bookmark._id)}
      aria-label="Delete bookmark"
      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
    >
      ✕
    </Button>
  </li>
);

export default BookmarkItem;
