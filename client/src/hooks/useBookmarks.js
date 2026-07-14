import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const useBookmarks = (videoId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchBookmarks = useCallback(async () => {
    if (!videoId) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/bookmarks', { params: { videoId } });
      setBookmarks(data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => { fetchBookmarks(); }, [fetchBookmarks]);

  const addBookmark = useCallback(async ({ timestamp, name }) => {
    const { data } = await api.post('/bookmarks', { videoId, timestamp, name });
    setBookmarks((prev) => [...prev, data.data].sort((a, b) => a.timestamp - b.timestamp));
    return data.data;
  }, [videoId]);

  const editBookmark = useCallback(async (id, updates) => {
    const { data } = await api.put(`/bookmarks/${id}`, updates);
    setBookmarks((prev) => prev.map((b) => (b._id === id ? data.data : b)));
    return data.data;
  }, []);

  const deleteBookmark = useCallback(async (id) => {
    await api.delete(`/bookmarks/${id}`);
    setBookmarks((prev) => prev.filter((b) => b._id !== id));
  }, []);

  return { bookmarks, loading, error, addBookmark, editBookmark, deleteBookmark };
};

export default useBookmarks;
