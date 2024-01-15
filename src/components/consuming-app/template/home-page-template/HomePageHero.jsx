import React from 'react';
import {useAppData} from '../../smart/app-state/AppStateProvider';
import styles from './HomePageTemplate.module.scss';
export const HomePageHero = () => {
  const { appData } = useAppData();
  
  const heroStyle = appData?.header?.height ? {
    height: `calc(100vh - ${appData.header.height}px)`
  }:{};
  
  return (
    <div className={styles.HeroContainer} style={heroStyle}> {/* Has background image. TODO: Make Container Component (Layout)*/}
      {/*<div className={'hero-box-spacer'}> /!* May not be necessary in code.*!/*/}
      {/*</div>*/}
      {/*<div className={'hero-overlayed-content'}>*/}
      {/*  <div className={'hero-box-cta-row'}> /!* TODO: Make a Row/stack Component (Layout)*!/*/}
      {/*    <div className={'hero-link-card'}> /!* TODO: Make a Link Card Component (Concrete) *!/*/}
      {/*    </div>*/}
      {/*    <div className={'hero-link-card'}>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={'hero-headline'}>*/}
      {/*    /!*<h2>Fast, friendly, and simple stay in your car service.</h2>*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
