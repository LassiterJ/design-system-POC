import { useState, useCallback, useLayoutEffect, useRef } from 'react';
import debounce from '../utilities/debounce';

export const useElementSize = () => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const elementRef = useRef(null);
  
  const updateSize = useCallback(() => {
    if (elementRef.current) {
      setHeight(elementRef.current.getBoundingClientRect().height);
      setWidth(elementRef.current.getBoundingClientRect().width);
    }
  }, []);
  
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    const debouncedUpdateSize = debounce(updateSize, 100); // Debounce with 100ms
    debouncedUpdateSize();
    const resizeObserver = new ResizeObserver(debouncedUpdateSize);
    resizeObserver.observe(elementRef.current);
    
    return () => {
      resizeObserver.disconnect();
      // debouncedUpdateSize.cancel(); TODO: Might implement this later
    };
  }, [updateSize]);
  
  return [{height,width}, elementRef];
};

export default useElementSize;
