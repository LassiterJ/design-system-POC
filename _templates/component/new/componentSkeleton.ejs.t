---
to: <%= componentLocation %>/<%= h.changeCase.param( componentName )%>/<%= h.changeCase.pascal( componentName )%>.js
---

import React from 'react';
import styles from './<%= h.changeCase.pascal( componentName )%>.module.scss'

export const <%= h.changeCase.pascal( componentName )%> = () => {
  return (
    <div className={styles.test}>
      <%= h.changeCase.pascal( componentName )%>
    </div>
  );
};


export default <%= h.changeCase.pascal( componentName )%>;



