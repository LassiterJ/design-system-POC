import { useState, useCallback, useLayoutEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

const useElementHeight = () => {
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);
  
  const updateHeight = useCallback(() => {
    if (elementRef.current) {
      setHeight(elementRef.current.getBoundingClientRect().height);
    }
  }, []);
  
  useLayoutEffect(() => {
    const debouncedUpdateHeight = debounce(updateHeight, 100); // Debounce with 100ms
    debouncedUpdateHeight();
    const resizeObserver = new ResizeObserver(debouncedUpdateHeight);
    resizeObserver.observe(elementRef.current);
    
    return () => {
      resizeObserver.disconnect();
      debouncedUpdateHeight.cancel();
    };
  }, [updateHeight]);
  
  return [height, elementRef];
};

export default useElementHeight;
