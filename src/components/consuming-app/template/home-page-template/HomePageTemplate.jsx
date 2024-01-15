import React from 'react';
import {AspectRatio} from '@radix-ui/react-aspect-ratio';
import styles from "./HomePageTemplate.module.scss";
import { useAppData } from '../../smart/app-state/AppStateProvider';
import { HomePageHero } from './HomePageHero';
import { LocationSearchSection } from '../../concrete/location-search-section/LocationSearchSection';
import { CommunitySection } from '../../concrete/community-section/CommunitySection';
import { ReviewsSection } from '../../concrete/reviews-section/ReviewsSection';
export const HomePageTemplate = ({children}) => {
  const { appData } = useAppData();
  const {windowClass, isPrimarilyATouchDevice} = appData;
  const isTouchDevice = isPrimarilyATouchDevice? "true" : "false";
  
  return(
    <div>
      <section className={styles.HeroSection} >
        <HomePageHero />
      </section>
      <section>
        <LocationSearchSection />
      </section>
      <section>
        <CommunitySection />
      </section>
      <section>
        <ReviewsSection />
      </section>
    </div>
  )
}
