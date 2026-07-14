import { useCallback, useEffect, useRef } from 'react';
import api from '../utils/api';

const DEBOUNCE_MS = 3000;

const useProgress = (videoId) => {
  const timerRef = useRef(null);

  // Cancel any pending debounced save on unmount to prevent post-unmount API calls
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Debounced save — waits 3 s after the last call before hitting the API
  const saveProgress = useCallback((watchedSeconds) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      try {
        await api.post(`/progress/${videoId}`, { watchedSeconds });
      } catch {
        // Silent — progress sync is best-effort
      }
    }, DEBOUNCE_MS);
  }, [videoId]);

  return { saveProgress };
};

export default useProgress;
