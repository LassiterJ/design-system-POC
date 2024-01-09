import React from 'react';
import {AspectRatio} from '@radix-ui/react-aspect-ratio';
import {useWindowClass} from "../../smart/window-class/WindowClass";
import styles from "./HomePageTemplate.module.scss";
export const HomePageTemplate = ({children}) => {
  // const {heroSection,findYourT5Section, communitySection, reviewsSection} = children;
  // const {heroImage} = heroSection;
  const windowClassData = useWindowClass();
  console.log("windowClassData: ", windowClassData);
  const isTouchDevice = windowClassData.isPrimarilyATouchDevice? "true" : "false";
  
  return(
    <div>
      <section className={styles.HeroSection} >
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
      <section>
        <h4>Find Your T5 Section</h4>
          <div>
            <p>The current window class is: <strong style={{fontWeight: "900"}}>{windowClassData.windowClass}</strong></p>
            <p>The user's device is a touch device: {isTouchDevice}</p>
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
