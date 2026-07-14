import { useState, useEffect } from 'react';
import api from '../utils/api';

const useVideos = (category = '') => {
  const [videos,  setVideos]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = category ? { category } : {};
        const { data } = await api.get('/videos', { params });
        if (!cancelled) setVideos(data.data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, [category]);

  return { videos, loading, error };
};

export default useVideos;
