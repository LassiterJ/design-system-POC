//Gets custom property from root element and returns it as a string
// Custom window class property is set in src/styles/breakpoints.scss
// And is added to state in src/components/consuming-app/smart/app-state/AppStateProvider.jsx

export const getCurrentWindowClass = () => {
  const rootStyle = getComputedStyle(document.documentElement);
  const windowClass = rootStyle.getPropertyValue('--current-breakpoint').trim();
  return windowClass;
};
