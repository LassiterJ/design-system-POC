import React, { createContext, useContext, useEffect, useState } from 'react';
import {debounce} from "../../../../utilities/js/debounce";
import {getCurrentWindowClass} from "./windowClass";
import {isTouchDevice} from "./deviceData";
import { DirectionProvider } from '@radix-ui/react-direction';

const AppStateContext = createContext({});
export const AppStateProvider = ({ children }) => {

  
  const [appData, setAppData] = useState({
    windowClass: getCurrentWindowClass(),
    isPrimarilyATouchDevice: isTouchDevice()
  });
  
  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setAppData(prevData => ({
        ...prevData,
        windowClass: getCurrentWindowClass(),
        isPrimarilyATouchDevice: isTouchDevice()
      }));
    }, 100);
    
    window.addEventListener('resize', debouncedHandleResize);
    
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);
  
  const updateAppState = (newState) => {
    setAppData((prevState) => {
      if(!prevState){
        return newState;
      }
      if((prevState !== newState)) {
        return { ...prevState, ...newState};
      }
    });
  };
  
  const updateAppStateByKey = (key, value) => {
    setAppData((prevState) => {
      try {
        if (!prevState || !key) {
          throw new Error("updateAppStateByKey error: prevData or key is null or undefined");
        }
        if (!prevState[key]) {
          return { ...prevState, [key]: value };
        }
        if ((prevState[key] !== value)) {
          return { ...prevState, [key]: value };
        }
      }catch(err){
        console.error("updateAppStateByKey error: ",err);
      }
    });
  };
  
  return (
    <DirectionProvider dir={'ltr'}>
      <AppStateContext.Provider value={{ appData, updateAppData: updateAppState, updateAppDataByKey: updateAppStateByKey }}>
        {children}
      </AppStateContext.Provider>
    </DirectionProvider>
  );
};

export const useAppData = () => useContext(AppStateContext);
