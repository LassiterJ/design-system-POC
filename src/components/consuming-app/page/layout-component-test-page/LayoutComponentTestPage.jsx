import React from 'react';
import styles from './LayoutComponentTestPage.module.scss';
import { Box } from '../../layout/box/Box';
import { Container } from '../../layout/container/Container';
export const LayoutComponentTestPage = () => {
  return (
    <div className={styles.test}>
      LayoutComponentTestPage
      {/*<Box inset={'1/3'} p={'2'} width={'1'} className={'TestBox'}>*/}
      {/*  <span>This is a Box</span>*/}
      {/*</Box>*/}
      <Container>
        <div>Container</div>
      </Container>
    </div>
  );
};

export default LayoutComponentTestPage;
