import ReactPlayer from 'react-player';

const VideoPlayer = ({ url, playerRef, onProgress, onReady, startSeconds = 0 }) => (
  <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden">
    <ReactPlayer
      ref={playerRef}
      url={url}
      width="100%"
      height="100%"
      controls
      onProgress={({ playedSeconds }) => onProgress?.(Math.floor(playedSeconds))}
      onReady={() => onReady?.()}
      config={{ file: { attributes: { controlsList: 'nodownload', disablePictureInPicture: true } } }}
    />
  </div>
);

export default VideoPlayer;
