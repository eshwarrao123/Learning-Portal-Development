const ProgressBar = ({ watchedSeconds, duration, completed }) => {
  const pct = duration > 0 ? Math.min((watchedSeconds / duration) * 100, 100) : 0;

  return (
    <div className="flex flex-col gap-1.5 mt-2">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{completed ? '✅ Completed' : `${Math.round(pct)}% watched`}</span>
        <span>{Math.floor(watchedSeconds / 60)}m / {Math.floor(duration / 60)}m</span>
      </div>
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            completed ? 'bg-green-500' : 'bg-brand-500'
          }`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
