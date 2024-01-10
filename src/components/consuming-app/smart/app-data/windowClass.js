export const windowSizeQueries = {
  'window-compact': '(max-width: 599px)',
  'window-medium': '(min-width: 600px) and (max-width: 1199px)',
  'window-expanded': '(min-width: 1200px)'
};

export const getWindowClass = () => {
  return Object.keys(windowSizeQueries).find(key =>
    window.matchMedia(windowSizeQueries[key]).matches
  ) || 'window-expanded';
};

