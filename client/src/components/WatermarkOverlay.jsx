import useAuth from '../hooks/useAuth';

/**
 * Diagonal semi-transparent user email watermark.
 * Pointer-events: none so it never blocks interaction.
 */
const WatermarkOverlay = () => {
  const { user } = useAuth();
  const email = user?.email || '';

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none no-select overflow-hidden"
    >
      {/* Repeated watermark grid */}
      <div className="w-full h-full grid grid-cols-3 grid-rows-4 gap-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center justify-center text-white/10 text-xs font-medium"
            style={{ transform: 'rotate(-30deg)', whiteSpace: 'nowrap' }}
          >
            {email}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WatermarkOverlay;
