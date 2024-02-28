import React from 'react';
import styles from './LayoutComponentTestPage.module.scss';
import { Box } from '../../layout/box/Box';
import { Container } from '../../layout/container/Container';
import { Flex } from '../../layout/flex/Flex.jsx';
import { useAppData } from '../../smart/app-state/AppStateProvider.jsx';
import { HomePageHero } from '../../template/home-page-template/HomePageHero.jsx';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import windowClassImage from '/src/assets/WindowClassExample CSS.png';
import { HomePage } from '../home-page/HomePage.jsx';
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
            className={styles.Box}
            width="20"
            flexShrink="false"
            height="20"
            style={{ backgroundColor: 'lightblue' }}
          ></Box>
          <Box
            className={styles.Box}
            width="20"
            flexShrink="false"
            height="20"
            style={{ backgroundColor: 'lightblue' }}
          ></Box>
          <Box
            className={styles.Box}
            flexGrow="true"
            minWidth="20"
            height="20"
            style={{ backgroundColor: '#b7e6ad' }}
          ></Box>
        </Flex>
        <Flex wrap="wrap">
          <Box
            className={styles.Box}
            width="44"
            height="20"
            style={{ backgroundColor: '#d4ade6' }}
          ></Box>
          <Box
            className={styles.Box}
            width="44"
            height="20"
            style={{ backgroundColor: '#d4ade6' }}
          ></Box>
          <Box
            className={styles.Box}
            width="44"
            height="20"
            style={{ backgroundColor: '#d4ade6' }}
          ></Box>
        </Flex>
      </Flex>
    </Container>
  );

  const windowClassCSS = (
    <Flex p="16" wrap="wrap" gap="4" align="center" justify="center">
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
            className={styles.Box}
            width={{ compact: 'full', medium: '20', expanded: '40' }}
            flexShrink="false"
            height="20"
            style={{ backgroundColor: 'lightblue' }}
          ></Box>
          <Box
            className={styles.Box}
            width="20"
            flexShrink="false"
            height="20"
            style={{ backgroundColor: 'lightblue' }}
          ></Box>
          <Box
            className={styles.Box}
            flexGrow="true"
            minWidth="20"
            height="20"
            style={{ backgroundColor: '#b7e6ad' }}
          ></Box>
        </Flex>
        <Flex wrap="wrap" p={{ compact: '4' }}>
          <Box
            className={styles.Box}
            width="44"
            minWidth={{ compact: 'full' }}
            height="20"
            style={{ backgroundColor: '#d4ade6' }}
          ></Box>
          <Box
            className={styles.Box}
            width="44"
            minWidth={{ compact: 'full' }}
            height="20"
            style={{ backgroundColor: '#d4ade6' }}
          ></Box>
          <Box
            className={styles.Box}
            width="44"
            minWidth={{ compact: 'full' }}
            height="20"
            style={{ backgroundColor: '#d4ade6' }}
          ></Box>
        </Flex>
      </Flex>
    </Container>
  );

  const examples = {
    basic: basicExample,
    windowClassCSS,
    windowClassWithOriginalExample,
    windowClassHero: <HomePage />,
  };

  if (!!example) {
    return examples[example];
  }
  return examples['basic'];
};

export default LayoutComponentTestPage;
