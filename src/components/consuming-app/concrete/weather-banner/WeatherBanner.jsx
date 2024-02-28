import React from 'react';
import styles from './WeatherBanner.module.scss';
import Box from '../../layout/box/Box.jsx';

export const WeatherBanner = () => {
  return (
    <Box
      height="7"
      width="full"
      className={styles.weatherBanner}
      style={{ backgroundColor: '#d4ade6' }}
    ></Box>
  );
};
