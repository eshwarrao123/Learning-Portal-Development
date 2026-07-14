import { useState, useEffect } from 'react';
import api from '../utils/api';

const useContinueWatching = () => {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/progress/continue');
        if (!cancelled) setItems(data.data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    return () => { cancelled = true; };
  }, []);

  return { items, loading, error };
};

export default useContinueWatching;
