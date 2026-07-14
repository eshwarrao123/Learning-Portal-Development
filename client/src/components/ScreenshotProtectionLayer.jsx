import useScreenshotProtection from '../hooks/useScreenshotProtection';
import WatermarkOverlay from './WatermarkOverlay';

/**
 * ScreenshotProtectionLayer
 *
 * Wraps the video player with:
 *  1. PrintScreen full-screen overlay + blur + Resume button
 *  2. Tab-switch overlay + blur + Click-to-resume
 *  3. Ctrl+S / Ctrl+P toast notification
 *  4. Right-click tooltip
 *  5. Diagonal watermark (always visible)
 */
const ScreenshotProtectionLayer = ({ children, playerRef }) => {
  const {
    overlayType,
    toastMessage,
    tooltipVisible,
    tooltipPos,
    dismissOverlay,
    handleContextMenu,
    triggerScreenshotOverlay,
  } = useScreenshotProtection(playerRef);

  const isOverlayVisible = overlayType !== null;

  return (
    <div
      className="relative no-select group"
      onContextMenu={handleContextMenu}
    >
      {import.meta.env.DEV && (
        <button
          onClick={(e) => {
            e.preventDefault();
            triggerScreenshotOverlay('debug-button');
          }}
          className="absolute top-4 right-4 z-40 bg-black/50 hover:bg-red-600/90 text-white text-xs px-3 py-1.5 rounded backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Test Protection
        </button>
      )}

      {/* ── Video content (blurred when overlay is active) ── */}
      <div
        style={{
          filter: isOverlayVisible ? 'blur(20px)' : 'none',
          transition: 'filter 0.25s ease',
        }}
      >
        <WatermarkOverlay />
        {children}
      </div>

      {/* ── PrintScreen full-screen overlay ─────────────────── */}
      {overlayType === 'printscreen' && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="ps-title"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5
                     bg-gray-950/95 rounded-xl"
        >
          {/* Icon */}
          <div className="text-5xl select-none">🚫</div>

          <div className="text-center px-6">
            <h2 id="ps-title" className="text-white text-xl font-bold mb-2">
              Screenshot Not Allowed
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Screenshots are discouraged on this platform to protect the content.
            </p>
          </div>

          <button
            onClick={dismissOverlay}
            className="mt-2 px-6 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500
                       text-white font-medium text-sm transition-colors focus:outline-none
                       focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            ▶ Resume Watching
          </button>
        </div>
      )}

      {/* ── Tab-switch overlay ──────────────────────────────── */}
      {overlayType === 'tab-switch' && (
        <button
          onClick={dismissOverlay}
          aria-label="Click to resume watching"
          className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4
                     bg-gray-950/90 backdrop-blur-lg rounded-xl w-full cursor-pointer
                     border-0 outline-none focus:ring-2 focus:ring-brand-400"
        >
          <div className="text-4xl select-none">⏸</div>
          <p className="text-gray-300 text-sm font-medium">
            Video paused — tab was switched
          </p>
          <span className="px-5 py-2 rounded-lg bg-brand-600/80 hover:bg-brand-500
                           text-white text-sm font-medium transition-colors">
            Click to Resume
          </span>
        </button>
      )}

      {/* ── Ctrl+S / Ctrl+P toast ───────────────────────────── */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40
                     bg-gray-900 border border-gray-700 text-gray-200
                     text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl
                     animate-fade-in whitespace-nowrap"
        >
          ⚠️ {toastMessage}
        </div>
      )}

      {/* ── Right-click tooltip ─────────────────────────────── */}
      {tooltipVisible && (
        <div
          aria-hidden="true"
          className="fixed z-50 bg-gray-800 border border-gray-700 text-gray-300
                     text-xs px-3 py-1.5 rounded shadow-lg pointer-events-none"
          style={{ top: tooltipPos.y + 8, left: tooltipPos.x + 8 }}
        >
          🔒 Right-click is disabled
        </div>
      )}
    </div>
  );
};

export default ScreenshotProtectionLayer;
