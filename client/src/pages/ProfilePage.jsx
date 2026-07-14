import { useState, useEffect } from 'react';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import ProgressList from '../components/ProgressList';
import Badge from '../components/ui/Badge';

const ProfilePage = () => {
  const { user } = useAuth();
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/progress');
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

  const completed = items.filter((i) => i.completed).length;

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto">
      {/* User card */}
      <div className="card p-6 flex items-center gap-5">
        <div className="h-16 w-16 rounded-full bg-brand-600/30 flex items-center justify-center text-2xl font-bold text-brand-400 shrink-0">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">{user?.name}</h1>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <div className="flex gap-2 mt-2">
            <Badge variant={user?.role === 'admin' ? 'brand' : 'default'}>{user?.role}</Badge>
            <Badge variant="success">{completed} completed</Badge>
          </div>
        </div>
      </div>

      {/* Watch history */}
      <section aria-labelledby="history-heading">
        <h2 id="history-heading" className="text-lg font-semibold text-white mb-4">Watch History</h2>
        <ProgressList items={items} loading={loading} error={error} />
      </section>
    </div>
  );
};

export default ProfilePage;
