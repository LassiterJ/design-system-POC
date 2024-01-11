import React from 'react';
import styles from './WeatherBanner.module.scss';

export const WeatherBanner = () => {
  return (
    <div className={styles.weatherBanner} style={{ height: '2rem', width: '100%', backgroundColor: 'lightsalmon' }}></div>
  )
}
