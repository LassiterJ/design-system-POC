import React from 'react';
import styles from './LayoutComponentTestPage.module.scss'
import {Box} from '../../layout/box/Box';
export const LayoutComponentTestPage = () => {
  return (
    <div className={styles.test}>
      LayoutComponentTestPage
      <Box p={"2"} ms={{md:"-3", lg: "start"}} width={"1"} className={"TestBox"} start={"50%"} display={"none"}>
        <span>This is a Box</span>
      </Box>
    </div>
  );
};


export default LayoutComponentTestPage;



