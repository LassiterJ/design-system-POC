import React from 'react';
import { Header } from '../../concrete/header/Header';
import { Footer } from '../../concrete/footer/Footer';
import styles from './MainLayout.module.scss';
import { HeaderLayoutExample } from '../../concrete/header/HeaderLayoutExample';
import { WeatherBanner } from '../../concrete/weather-banner/WeatherBanner';
import * as Portal from '@radix-ui/react-portal';
import { useAppData } from '../../smart/app-state/AppStateProvider';
import Box from '../../layout/box/Box.jsx';
import Flex from '../../layout/flex/Flex.jsx';
export const MainLayout = ({ children, displayHeader }) => {
  const { appData } = useAppData();
  const headerRef = appData?.header?.elementRef?.current;
  return (
    <Box className={styles.mainLayout}>
      <Header />
      {/*<HeaderLayoutExample />*/}
      <Portal.Root container={headerRef}>
        <WeatherBanner />
      </Portal.Root>
      <Flex asChild height="full" direction="column">
        <main>{children}</main>
      </Flex>
      <Footer />
    </Box>
  );
};
