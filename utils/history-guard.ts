/**
 * Called ONCE on app boot via HistoryProvider.
 * If user landed directly on an internal page with no prior
 * internal history, inject '/' as the base history entry
 * so back button always has somewhere to go within the app.
 */
export const initHistoryGuard = () => {
  if (typeof window === 'undefined') return;

  const isDirectEntry = window.history.length <= 1;
  const isNotHome = window.location.pathname !== '/';

  if (isDirectEntry && isNotHome) {
    // 1. Replace current entry with '/' (silent)
    window.history.replaceState(
      { internal: true, page: 'home' },
      '',
      '/'
    );
    // 2. Push the actual current page back on top
    window.history.pushState(
      { internal: true, page: window.location.pathname },
      '',
      window.location.search ? window.location.pathname + window.location.search : window.location.pathname
    );
  }
};

/**
 * Mark every history entry as "internal" so we can detect
 * if the NEXT back would leave the app
 */
export const markHistoryEntry = (path: string) => {
  if (typeof window === 'undefined') return;
  window.history.replaceState(
    { ...window.history.state, internal: true, offgrids: true, from: path },
    '',
    path
  );
};
