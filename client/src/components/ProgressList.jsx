import ProgressItem from './ProgressItem';
import Spinner from './ui/Spinner';

const ProgressList = ({ items, loading, error }) => {
  if (loading) return <div className="flex justify-center py-10"><Spinner /></div>;
  if (error)   return <p className="text-red-400 text-center py-6">{error}</p>;
  if (!items.length) return <p className="text-gray-500 text-center py-6">No watch history yet.</p>;

  return (
    <ul className="flex flex-col gap-3" aria-label="Watch history">
      {items.map((item) => <ProgressItem key={item._id} item={item} />)}
    </ul>
  );
};

export default ProgressList;
