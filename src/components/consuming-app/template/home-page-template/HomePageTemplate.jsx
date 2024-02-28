import React from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import styles from './HomePageTemplate.module.scss';
import { useAppData } from '../../smart/app-state/AppStateProvider';
import { HomePageHero } from './HomePageHero';
import { LocationSearchSection } from '../../concrete/location-search-section/LocationSearchSection';
import { CommunitySection } from '../../concrete/community-section/CommunitySection';
import { ReviewsSection } from '../../concrete/reviews-section/ReviewsSection';
import { Flex } from '../../layout/flex/Flex';
export const HomePageTemplate = ({ children }) => {
  return (
    <Flex direction={'column'}>
      <section>
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
    </Flex>
  );
};
