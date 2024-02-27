import React from 'react';
import styles from './LayoutComponentTestPage.module.scss';
import { Box } from '../../layout/box/Box';
import { Container } from '../../layout/container/Container';
import { Flex } from '../../layout/flex/Flex.jsx';
import { useAppData } from '../../smart/app-state/AppStateProvider.jsx';
import { HomePageHero } from '../../template/home-page-template/HomePageHero.jsx';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import windowClassImage from '/src/assets/WindowClassExample CSS.png';
export const LayoutComponentTestPage = (props) => {
  const { example } = props;
  const { appData } = useAppData();
  console.log('appData: ', appData);
  const { windowClass } = appData;
  // basic 2 row example contained in a container with a 6 column flex grid. First row 2 boxes second row 3;
  // all boxes are sized themselves.
  const basicExample = (
    <Container size="3" height="full" py="8">
      <Flex gap="4" direction="column">
        <Flex wrap="wrap">
          <Box
            width="20"
            flexShrink="false"
            height="20"
            style={{ backgroundColor: 'lightblue' }}
          ></Box>
          <Box
            flexGrow="true"
            minWidth="20"
            height="20"
            style={{ backgroundColor: '#87c1c1' }}
          ></Box>
        </Flex>
        <Flex wrap="wrap">
          <Box
            p={{ compact: '20', medium: '24', expanded: '32' }}
            width="20"
            height="20"
            style={{ backgroundColor: 'magenta' }}
          ></Box>
          <Box width="20" height="20" style={{ backgroundColor: 'lightblue' }}></Box>
          <Box width="20" height="20" style={{ backgroundColor: 'lightblue' }}></Box>
        </Flex>
      </Flex>
    </Container>
  );

  const windowClassCSS = (
    <Flex wrap="wrap" gap="4">
      <Box
        direction="column"
        gap="4"
        width="60"
        className={styles['window-class-css-img-container']}
        align="center"
      >
        <AspectRatio ratio={4 / 3}>
          <img
            className={styles['window-class-css-img']}
            src={windowClassImage}
            alt="window class css"
          />
        </AspectRatio>
      </Box>
      <Flex
        direction="column"
        gap="4"
        minWidth="60"
        minHeight="40"
        p="12"
        className={styles['window-class-css']}
        align="center"
      >
        <p>This is the</p>
        <h2>{windowClass.toUpperCase()}</h2>
        <p>"window class" (breakpoint range)</p>
      </Flex>
    </Flex>
  );
  const windowClassWithOriginalExample = (
    <Container size="3" height="full" py="8">
      <Flex gap="4" direction="column">
        <Flex wrap="wrap">
          <Box
            width="20"
            flexShrink="false"
            height="20"
            style={{ backgroundColor: 'lightblue' }}
          ></Box>
          <Box
            flexGrow="true"
            minWidth="20"
            height="20"
            style={{ backgroundColor: '#87c1c1' }}
          ></Box>
        </Flex>
        <Flex wrap="wrap">
          <Box width="20" height="20" style={{ backgroundColor: 'lightblue' }}></Box>
          <Box width="20" height="20" style={{ backgroundColor: 'lightblue' }}></Box>
          <Box width="20" height="20" style={{ backgroundColor: 'lightblue' }}></Box>
        </Flex>
      </Flex>
    </Container>
  );
  // <Container size="3" height="full" py="16">
  //   <Flex gap="4" justify="center" align="middle">
  //     <Box width="60" height="40" p="12" className={styles['window-class-css']} align="center">
  //       <p>This is the {windowClass} window class(breakpoint range)</p>
  //     </Box>
  //   </Flex>
  // </Container>
  // );

  const examples = {
    basic: basicExample,
    windowClassCSS,
    windowClassWithOriginalExample,
    windowClassHero: HomePageHero,
  };

  if (!!example) {
    return examples[example];
  }
  return (
    <div className={styles.test}>
      <h2>LayoutComponentTestPage</h2>
      <Box width={'full'} p="4" style={{ backgroundColor: 'lightgray' }}>
        <Container size="4">
          <Box
            p={'4'}
            width={'40'}
            height={'20'}
            className={'TestBox'}
            style={{ backgroundColor: 'indigo' }}
          >
            <span>This is a Box inside a Container</span>
          </Box>
        </Container>
      </Box>
      {/*<Flex*/}
      {/*  m={2}*/}
      {/*  gap={'4'}*/}
      {/*  justify="between"*/}
      {/*  className={'TestFlex'}*/}
      {/*  style={{ backgroundColor: 'lightgreen' }}*/}
      {/*>*/}
      {/*  <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>*/}
      {/*    <span>This is a Box inside a Flex component</span>*/}
      {/*  </Box>*/}
      {/*  <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>*/}
      {/*    <span>This is a Box inside a Flex component</span>*/}
      {/*  </Box>*/}
      {/*  <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>*/}
      {/*    <span>This is a Box inside a Flex component</span>*/}
      {/*  </Box>*/}
      {/*  <Box width={'full'} p={'4'} className={'TestBox'} style={{ backgroundColor: 'lightblue' }}>*/}
      {/*    <span>This is a Box inside a Flex component</span>*/}
      {/*  </Box>*/}
      {/*</Flex>*/}
    </div>
  );
};

export default LayoutComponentTestPage;
