import { useEffect } from 'react';
import useElementSize from './useElementSize'; // This hook would get both width and height
import { useAppData } from '../components/consuming-app/smart/app-data/AppData';

export const useUpdateElementSize = (elementKey) => {
  const [elementSize, elementRef] = useElementSize();
  const { appData, updateAppDataByKey } = useAppData();
  
  useEffect(() => {
    if(!elementSize || !appData) return;
    if(!appData[elementKey]) {
      updateAppDataByKey(elementKey, {...elementSize, elementRef});
    } else if (appData[elementKey]?.height !== elementSize.height || appData[elementKey]?.width !== elementSize.width) {
      updateAppDataByKey(elementKey, {...appData[elementKey], ...elementSize, elementRef});
    }
  }, [elementSize, elementKey, updateAppDataByKey]);
  
  return elementRef;
};

export default useUpdateElementSize;
