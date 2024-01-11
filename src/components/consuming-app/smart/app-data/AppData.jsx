import React, { createContext, useContext, useEffect, useState } from 'react';
import {debounce} from "../../../../utilities/debounce";
import {getWindowClass} from "./windowClass";
import {isTouchDevice} from "./deviceData";
import { DirectionProvider } from '@radix-ui/react-direction';
const AppDataContext = createContext({});
export const AppDataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    windowClass: getWindowClass(),
    isPrimarilyATouchDevice: isTouchDevice()
  });
  
  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setAppData(prevData => ({
        ...prevData,
        windowClass: getWindowClass(),
        isPrimarilyATouchDevice: isTouchDevice()
      }));
    }, 100);
    
    window.addEventListener('resize', debouncedHandleResize);
    
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);
  
  const updateAppData = (newData) => {
    setAppData((prevData) => {
      if(!prevData){
        return newData;
      }
      if((prevData !== newData)) {
        return { ...prevData, ...newData};
      }
    });
  };
  
  const updateAppDataByKey = (key, value) => {
    setAppData((prevData) => {
      if(!prevData || !key){
        return;
      }
      if(!prevData[key]){
        return { ...prevData, [key]: value};
      }
      if((prevData[key] !== value)) {
       return { ...prevData, [key]: value};
      }
    });
  };
  
  return (
    <DirectionProvider dir={'ltr'}>
      <AppDataContext.Provider value={{ appData, updateAppData, updateAppDataByKey }}>
        {children}
      </AppDataContext.Provider>
    </DirectionProvider>
  );
};

export const useAppData = () => useContext(AppDataContext);
