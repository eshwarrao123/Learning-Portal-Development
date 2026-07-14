import BookmarkItem from './BookmarkItem';
import Spinner from './ui/Spinner';

const BookmarkList = ({ bookmarks, loading, onSeek, onDelete }) => {
  if (loading) return <Spinner size="sm" className="mx-auto my-4" />;

  if (!bookmarks.length) return (
    <p className="text-xs text-gray-500 py-3">No bookmarks yet — use the form above to add one.</p>
  );

  return (
    <ul className="mt-2" aria-label="Video bookmarks">
      {bookmarks.map((b) => (
        <BookmarkItem key={b._id} bookmark={b} onSeek={onSeek} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default BookmarkList;
