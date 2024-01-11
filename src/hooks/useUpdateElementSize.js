import { useEffect } from 'react';
import useElementSize from './useElementSize'; // This hook would get both width and height
import { useAppData } from '../components/consuming-app/smart/app-data/AppData';

export const useUpdateElementSize = (elementKey) => {
  const [elementSize, elementRef] = useElementSize();
  console.log("elementSize", elementSize);
  const { appData, updateAppDataByKey } = useAppData();
  
  useEffect(() => {
    
    if (appData[elementKey]?.height !== elementSize.height || appData[elementKey]?.width !== elementSize.width) {
      updateAppDataByKey(elementKey, elementSize);
    }
  }, [elementSize, elementKey, updateAppDataByKey]);
  
  return elementRef;
};

export default useUpdateElementSize;
