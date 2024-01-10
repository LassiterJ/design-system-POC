import React, { createContext, useContext, useEffect, useState } from 'react';
import {debounce} from "../../../../utilities/debounce";
import {getWindowClass} from "./windowClass";
import {isTouchDevice} from "./deviceData";
const AppDataContext = createContext({});
export const AppDataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    headerHeight: 0,
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
    setAppData({ ...appData, ...newData });
  };
  const updateAppDataByKey = (key, value) => {
    setAppData({ ...appData, [key]: value });
  }
  
  return (
    <AppDataContext.Provider value={{ appData, updateAppData, updateAppDataByKey }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
