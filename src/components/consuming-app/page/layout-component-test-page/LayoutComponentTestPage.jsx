import React from 'react';
import styles from './LayoutComponentTestPage.module.scss';
import { Box } from '../../layout/box/Box';
import { Container } from '../../layout/container/Container';
import Flex from '../../layout/flex/Flex.jsx';
export const LayoutComponentTestPage = () => {
  return (
    <div className={styles.test}>
      <h2>LayoutComponentTestPage</h2>
      {/*<Box width={'full'} p="4" className={'outerdiv'} style={{ backgroundColor: 'lightgray' }}>*/}
      {/*  <Container size="4">*/}
      {/*    <Box p={'4'} className={'TestBox'} style={{ backgroundColor: 'indigo' }}>*/}
      {/*      <span>This is a Box inside a Container</span>*/}
      {/*    </Box>*/}
      {/*  </Container>*/}
      {/*</Box>*/}
      <Flex
        position="absolute"
        m={'2'}
        inset={'1/6'}
        gap={'4'}
        className={'TestFlex'}
        style={{ backgroundColor: 'lightgreen' }}
      >
        <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
          <span>This is a Box inside a Flex component</span>
        </Box>
        <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
          <span>This is a Box inside a Flex component</span>
        </Box>
        <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
          <span>This is a Box inside a Flex component</span>
        </Box>
        <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>
          <span>This is a Box inside a Flex component</span>
        </Box>
      </Flex>
    </div>
  );
};

export default LayoutComponentTestPage;
