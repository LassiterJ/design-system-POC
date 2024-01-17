// export const windowSizeQueries = {
//   'window-compact': '(max-width: 599px)',
//   'window-medium': '(min-width: 600px) and (max-width: 1199px)',
//   'window-expanded': '(min-width: 1200px)'
// };
//
//
//
// export const getCurrentWindowClass = () => {
//   return Object.keys(windowSizeQueries).find(key =>
//     window.matchMedia(windowSizeQueries[key]).matches
//   ) || 'window-expanded';
// };
// Testing css custom property and scss mixin solution. Both solutions have their pros and cons.
export const getCurrentBreakpoint = () => {
  const rootStyle = getComputedStyle(document.documentElement);
  const breakpoint = rootStyle.getPropertyValue('--current-breakpoint').trim();
  return breakpoint;
};

export const getCurrentWindowClass = () => {
  return getCurrentBreakpoint();
};

