import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import useVideo from '../hooks/useVideo';
import useBookmarks from '../hooks/useBookmarks';
import useProgress from '../hooks/useProgress';

import ScreenshotProtectionLayer from '../components/ScreenshotProtectionLayer';
import VideoPlayer from '../components/VideoPlayer';
import VideoInfo from '../components/VideoInfo';
import ProgressBar from '../components/ProgressBar';
import AddBookmarkForm from '../components/AddBookmarkForm';
import BookmarkList from '../components/BookmarkList';
import Spinner from '../components/ui/Spinner';

const VideoPlayerPage = () => {
  const { id } = useParams();
  const playerRef = useRef(null);

  const { video, progress, setProgress, loading, error } = useVideo(id);
  const { bookmarks, loading: bmLoading, addBookmark, deleteBookmark } = useBookmarks(id);
  const { saveProgress } = useProgress(id);

  const getCurrentTime = () =>
    playerRef.current?.getCurrentTime?.() ?? 0;

  const handleSeek = (seconds) => {
    playerRef.current?.seekTo?.(seconds, 'seconds');
  };

  const handleProgress = (playedSeconds) => {
    setProgress((prev) => ({ ...prev, watchedSeconds: playedSeconds }));
    saveProgress(playedSeconds);
  };

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  if (error)   return <p className="text-center text-red-400 py-10">{error}</p>;
  if (!video)  return null;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <ScreenshotProtectionLayer playerRef={playerRef}>
        <VideoPlayer
          url={video.url}
          playerRef={playerRef}
          onProgress={handleProgress}
          startSeconds={progress.watchedSeconds}
        />
      </ScreenshotProtectionLayer>

      <VideoInfo video={video} />

      <ProgressBar
        watchedSeconds={progress.watchedSeconds}
        duration={video.duration}
        completed={progress.completed}
      />

      {/* Bookmarks section */}
      <section className="card p-4 flex flex-col gap-3" aria-labelledby="bm-heading">
        <h2 id="bm-heading" className="text-sm font-semibold text-white">Bookmarks</h2>
        <AddBookmarkForm onAdd={addBookmark} getCurrentTime={getCurrentTime} />
        <BookmarkList
          bookmarks={bookmarks}
          loading={bmLoading}
          onSeek={handleSeek}
          onDelete={deleteBookmark}
        />
      </section>
    </div>
  );
};

export default VideoPlayerPage;
