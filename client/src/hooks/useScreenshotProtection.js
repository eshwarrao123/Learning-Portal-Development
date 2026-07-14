import { useState, useEffect, useCallback } from 'react';

const useScreenshotProtection = (playerRef) => {
  const [isBlurred, setIsBlurred] = useState(false);

  // Block PrintScreen, Ctrl+S, and Ctrl+P (print)
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      // Clear clipboard asynchronously so a captured screenshot is blank
      navigator.clipboard?.writeText('').catch(() => {});
    }
    if (e.ctrlKey && (e.key === 's' || e.key === 'p')) {
      e.preventDefault();
    }
  }, []);

  // Block right-click on the video wrapper
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Blur + pause video when tab loses focus
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setIsBlurred(true);
      // Pause the ReactPlayer if ref is available
      playerRef?.current?.getInternalPlayer()?.pause?.();
    } else {
      setIsBlurred(false);
    }
  }, [playerRef]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleKeyDown, handleVisibilityChange]);

  return { isBlurred, handleContextMenu };
};

export default useScreenshotProtection;
