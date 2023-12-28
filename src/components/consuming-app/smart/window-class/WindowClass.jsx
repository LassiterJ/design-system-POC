import React, { createContext, useContext, useEffect, useState } from 'react';

const WindowClassContext = createContext();

const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
  };
};

// Object defining the matchMedia queries
const windowSizeQueries = {
  'window-compact': '(max-width: 599px)',
  'window-medium': '(min-width: 600px) and (max-width: 1199px)',
  'window-expanded': '(min-width: 1200px)'
};

const getWindowClass = () => {
  return Object.keys(windowSizeQueries).find(key =>
    window.matchMedia(windowSizeQueries[key]).matches
  ) || 'window-expanded'; // Default if no match
};
const isTouchDevice = () => {
  // If the user's device is primarily a touch device, return true. (e.g. mobile, tablet)
  // TODO: This only triggers on resize currently. We will probably want this to be triggered another way.
    return matchMedia("(pointer: coarse)").matches;
  // return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};


export const WindowClassProvider = ({ children }) => {
  const [windowClass, setWindowClass] = useState(getWindowClass());
  const [touchDevice, setTouchDevice] = useState(isTouchDevice());
  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWindowClass(getWindowClass());
      setTouchDevice(isTouchDevice());
    }, 100);
    
    window.addEventListener('resize', debouncedHandleResize);
    
    
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);
  
  const data = {
    windowClass,
    isPrimarilyATouchDevice: touchDevice,
  };
  return (
    <WindowClassContext.Provider value={data}>
      {children}
    </WindowClassContext.Provider>
  );
};

export const useWindowClass = () => {
  const context = useContext(WindowClassContext);
  if (context === undefined) {
    throw new Error('useWindowClass must be a descendant of the WindowClassProvider');
  }
  return context;
};
