import React from 'react';
import {useAppData} from '../../smart/app-state/AppStateProvider';

export const LocationSearchSection = () => {
  const { appData } = useAppData();
  const {windowClass, isPrimarilyATouchDevice} = appData;
  const isTouchDevice = isPrimarilyATouchDevice? "true" : "false";
  return (
    <div>{/*TODO: Might want to have a section component and/or move the section element out to template and use div. This would be to allow content to be added via portal underneath the content of the section if the section is flex-column.*/}
      <h4>Find Your T5 Section</h4>
      <div>
        <p>The current window class is: <strong style={{fontWeight: "900"}}>{windowClass}</strong></p>
        <p>The user's device is a touch device: {isTouchDevice}</p>
      </div>
    </div>
  );
}
