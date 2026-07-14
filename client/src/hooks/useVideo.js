import { useState, useEffect } from 'react';
import api from '../utils/api';

const useVideo = (id) => {
  const [video,    setVideo]    = useState(null);
  const [progress, setProgress] = useState({ watchedSeconds: 0, completed: false });
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const [videoRes, progressRes] = await Promise.all([
          api.get(`/videos/${id}`),
          api.get(`/progress/${id}`),
        ]);
        if (!cancelled) {
          setVideo(videoRes.data.data);
          setProgress(progressRes.data.data);
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { video, progress, setProgress, loading, error };
};

export default useVideo;
