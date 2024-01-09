import React from "react";
import { Header } from "../../concrete/header/Header";
import { Footer } from "../../concrete/footer/Footer";
import styles from "./MainLayout.module.scss";
import { HeaderLayoutExample } from '../../concrete/header/HeaderLayoutExample';
import { WeatherBanner } from '../../concrete/weather-banner/WeatherBanner';
export const MainLayout = ({ children, displayHeader }) => {
  const headerContent = displayHeader ? (<div>
    <HeaderLayoutExample />
    <WeatherBanner />
  </div>) : null;
  
  return (
    <div className={styles.mainLayout}>
      {headerContent}
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
      )
}
