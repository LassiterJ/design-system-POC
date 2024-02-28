import React from 'react';
import { useAppData } from '../../smart/app-state/AppStateProvider';
import styles from './HomePageTemplate.module.scss';
import Box from '../../layout/box/Box';
import { Container } from '../../layout/container/Container';
import { Flex } from '../../layout/flex/Flex';
export const HomePageHero = () => {
  const { appData } = useAppData();

  const heroStyle = appData?.header?.height
    ? {
        height: `calc(100vh - ${appData.header.height}px)`,
      }
    : {};

  return (
    <Flex position="relative" className={styles.Hero} style={heroStyle} direction="column">
      <Box
        position="absolute"
        width="full"
        height="full"
        top="0"
        start="0"
        end="0"
        bottom="0"
        className={styles.HeroImage}
      ></Box>
      <Flex className={styles.HeroContent} p="20" gap="16" direction="column" position="relative">
        <Box>
          <h1 className={styles.HeroHeadline}>
            Wash Your Way <span className={styles.HeroSubHead}>or something...</span>
          </h1>
        </Box>
      </Flex>
    </Flex>
  );
};
