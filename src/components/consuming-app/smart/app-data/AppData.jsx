import React, { createContext, useContext, useEffect, useState } from 'react';
import {debounce} from "../../../../utilities/debounce";
import {getWindowClass} from "./windowClass";
import {isTouchDevice} from "./deviceData";
const AppDataContext = createContext({});
export const AppDataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    headerSize: {width:0, height: 0},
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
    console.log("key: ", key);
    setAppData((prevData) => {
      console.log("updateAppDataByKey/prevData: ", prevData);
      if(!prevData){
        return;
      }
      if((prevData[key] !== value)) {
       return { ...prevData, [key]: value};
      }
    });
  };
  
  return (
    <AppDataContext.Provider value={{ appData, updateAppData, updateAppDataByKey }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
