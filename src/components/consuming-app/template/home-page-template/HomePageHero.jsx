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
    <Flex p="20" style={heroStyle} direction="column">
      <Box>
        <h1>Find your next adventure</h1>
      </Box>
      <Box>
        <p>Search for a location or activity</p>
      </Box>
      <Box>
        <input type="text" placeholder="Search" />
        <button type="submit" className={styles.cta}>
          Search
        </button>
      </Box>
    </Flex>
  );
};
