import { useRef } from 'react';
import useScreenshotProtection from '../hooks/useScreenshotProtection';
import WatermarkOverlay from './WatermarkOverlay';

/**
 * Wraps VideoPlayerPage content.
 * - Applies blur when tab switches away (isBlurred).
 * - Renders WatermarkOverlay at all times.
 * - Blocks right-click on the entire zone.
 */
const ScreenshotProtectionLayer = ({ children, playerRef }) => {
  const { isBlurred, handleContextMenu } = useScreenshotProtection(playerRef);

  return (
    <div
      className="relative no-select"
      onContextMenu={handleContextMenu}
    >
      {/* Blur overlay when tab is hidden */}
      {isBlurred && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 bg-gray-950/80 backdrop-blur-xl flex items-center justify-center"
        >
          <p className="text-gray-400 text-sm font-medium select-none">
            ⏸ Video paused — return to this tab to continue watching
          </p>
        </div>
      )}

      <WatermarkOverlay />
      {children}
    </div>
  );
};

export default ScreenshotProtectionLayer;
