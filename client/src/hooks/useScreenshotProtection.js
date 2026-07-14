import { useState, useEffect, useCallback, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   useScreenshotProtection
   Three-strategy PrintScreen detection:
     1. keydown + keyup (catches all browsers)
     2. window blur/focus rapid-return (Snipping Tool, Lightshot)
     3. Clipboard clear deterrent (100 ms delay)
───────────────────────────────────────────────────────────────── */

const isPrintScreen = (e) =>
  e.key === 'PrintScreen' ||
  e.code === 'PrintScreen' ||
  e.keyCode === 44;

const useScreenshotProtection = (playerRef) => {
  const [overlayType,    setOverlayType]    = useState(null);  // 'printscreen'|'tab-switch'|null
  const [toastMessage,   setToastMessage]   = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos,     setTooltipPos]     = useState({ x: 0, y: 0 });

  const toastTimerRef   = useRef(null);
  const tooltipTimerRef = useRef(null);
  const blurTimerRef    = useRef(null);  // Strategy 2 timer

  // ── Helpers ──────────────────────────────────────────────────
  const pauseVideo = useCallback(() => {
    const player = playerRef?.current;
    if (!player) return;
    // ReactPlayer internal player (HTML5 video)
    const internal = player.getInternalPlayer?.();
    internal?.pause?.();
    // Fallback for direct ref
    player.pause?.();
  }, [playerRef]);

  const triggerScreenshotOverlay = useCallback((source = 'unknown') => {
    console.log('[ScreenshotProtection] triggered via:', source);
    pauseVideo();
    setOverlayType('printscreen');
    // Strategy 3 — clear clipboard after 100 ms
    setTimeout(() => {
      navigator.clipboard?.writeText('').catch(() => {});
    }, 100);
  }, [pauseVideo]);

  const dismissOverlay = useCallback(() => {
    setOverlayType(null);
    // Resume video on dismiss
    const player = playerRef?.current;
    player?.getInternalPlayer?.()?.play?.();
    player?.play?.();
  }, [playerRef]);

  const showToast = useCallback((msg) => {
    clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // ── Strategy 1 — keydown ─────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (isPrintScreen(e)) {
      e.preventDefault();
      triggerScreenshotOverlay('keydown');
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      showToast('Saving is disabled during video playback.');
    }
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      showToast('Printing is disabled during video playback.');
    }
  }, [triggerScreenshotOverlay, showToast]);

  // ── Strategy 1 — keyup (some browsers only fire on keyup) ───
  const handleKeyUp = useCallback((e) => {
    if (isPrintScreen(e)) {
      e.preventDefault();
      triggerScreenshotOverlay('keyup');
    }
  }, [triggerScreenshotOverlay]);

  // ── Strategy 2 — window blur/focus rapid-return ─────────────
  // Screenshot tools (Snipping Tool, Lightshot) steal focus briefly.
  // If window loses focus and regains it within 3 s → treat as screenshot.
  const handleWindowBlur = useCallback(() => {
    blurTimerRef.current = setTimeout(() => {
      blurTimerRef.current = null;
    }, 3000);
  }, []);

  const handleWindowFocus = useCallback(() => {
    if (blurTimerRef.current !== null) {
      // Window regained focus within 3 s — likely a screenshot tool
      clearTimeout(blurTimerRef.current);
      blurTimerRef.current = null;
      triggerScreenshotOverlay('window-blur-refocus');
    }
  }, [triggerScreenshotOverlay]);

  // ── Right-click ──────────────────────────────────────────────
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setTooltipPos({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
    clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => setTooltipVisible(false), 1800);
  }, []);

  // ── Tab visibility (visibilitychange) ────────────────────────
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      pauseVideo();
      setOverlayType('tab-switch');
    } else {
      setOverlayType((prev) => (prev === 'tab-switch' ? null : prev));
    }
  }, [pauseVideo]);

  // ── Mount / unmount ──────────────────────────────────────────
  useEffect(() => {
    document.addEventListener('keydown',       handleKeyDown);
    document.addEventListener('keyup',         handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur',  handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('keydown',       handleKeyDown);
      document.removeEventListener('keyup',         handleKeyUp);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur',  handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      clearTimeout(toastTimerRef.current);
      clearTimeout(tooltipTimerRef.current);
      clearTimeout(blurTimerRef.current);
    };
  }, [handleKeyDown, handleKeyUp, handleVisibilityChange,
      handleWindowBlur, handleWindowFocus]);

  return {
    overlayType,
    toastMessage,
    tooltipVisible,
    tooltipPos,
    dismissOverlay,
    handleContextMenu,
    triggerScreenshotOverlay, // exposed for the debug button
  };
};

export default useScreenshotProtection;
