import useAuth from '../hooks/useAuth';

/**
 * Diagonal repeating watermark overlay.
 * - 25% opacity, text-lg font, shows "Name | email"
 * - pointer-events: none — never blocks video interaction
 */
const WatermarkOverlay = () => {
  const { user } = useAuth();
  const label = user
    ? `${user.name || ''} | ${user.email || ''}`.trim().replace(/^\|/, '').trim()
    : '';

  if (!label) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-10 pointer-events-none no-select overflow-hidden"
    >
      {/* 4×4 = 16 tiles, each rotated -30° */}
      <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="flex items-center justify-center text-white text-lg font-semibold"
            style={{
              opacity: 0.25,
              transform: 'rotate(-30deg)',
              whiteSpace: 'nowrap',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WatermarkOverlay;
