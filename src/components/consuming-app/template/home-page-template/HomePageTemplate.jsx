import React from 'react';
import {AspectRatio} from '@radix-ui/react-aspect-ratio';
import styles from "./HomePageTemplateStyles.module.scss";
export const HomePageTemplate = ({children}) => {
  // const {heroSection,findYourT5Section, communitySection, reviewsSection} = children;
  // const {heroImage} = heroSection;
  return(
    <div>
      // Hero Section
      <section className={styles.HeroSection}>
        <h4>Hero Section</h4>
        <div className={styles.HeroContainer}> {/* Has background image. TODO: Make Container Component (Layout)*/}
          <div className={'hero-box-spacer'}> {/* May not be necessary in code.*/}
          
          </div>
          <div className={'hero-overlayed-content'}>
            <div className={'hero-box-cta-row'}> {/* TODO: Make a Row/stack Component (Layout)*/}
              <div className={'hero-link-card'}> {/* TODO: Make a Link Card Component (Concrete) */}
              
              </div>
              <div className={'hero-link-card'}>
              
              </div>
            </div>
            <div className={'hero-headline'}>
              <h2>Fast, friendly, and simple stay in your car service.</h2>
            </div>
          </div>
        </div>
      </section>
      // Find Your T5 Section
      <section>
        <h4>Find Your T5 Section</h4>
        <div>
      
        </div>
      </section>
      // Community Section
      <section>
        <h4>Community Section</h4>
        <div>
        
        </div>
      </section>
      // Reviews Section
      <section>
        <h4>Reviews Section</h4>
        <div>
        
        </div>
      </section>
    </div>
  )
}
