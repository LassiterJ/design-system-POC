import { useEffect } from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import styles from './Header.module.scss';
import Logo from '/src/logo.svg?react';
import { useAppData } from '../../smart/app-data/AppData';
import useElementSize from '../../../../hooks/useElementSize';
import useUpdateElementSize from '../../../../hooks/useUpdateElementSize';

export const Header = () => {
  const headerRef = useUpdateElementSize("header");
  return(
    <header ref={headerRef} className={styles.header}>
      <div className={styles.linksAndLogosContainer}>
        <div className={styles.logoContainer} style={{height: "2rem", width: "2rem", backgroundColor: 'indianred'}}>
          {/*<AspectRatio ratio={1}>*/}
          {/*  <Logo className={styles.logo}/>*/}
          {/*</AspectRatio>*/}
        </div>
        <nav className={styles.links} style={{ height: '2rem', width: '100%', backgroundColor: 'maroon'}}> {/*TODO: Replace with Base implementation of Radix's Navigation Menu Component*/}
          {/*<a href="#">Oil Change</a>*/}
          {/*<a href="#">Car Wash</a>*/}
          {/*<a href="#">About Us</a>*/}
          {/*<a href="#">Careers</a>*/}
          {/*<a href="#">Contact</a>*/}
          {/*<a href="#">Blog</a>*/}
        </nav>
      </div>
      <div className={styles.locationSearchContainer} style={{ height: "2rem", width: "100%", backgroundColor: 'aqua' }}>
        {/*<div className={styles.locationSearch}>*/}
        {/*  <input type="text" placeholder="Search" className={styles.inputField} />*/}
        {/*  <button className={styles.findAT5Button}><i>@</i> Find a Take 5</button>*/}
        {/*</div>*/}
        
      </div>
      <div className={styles.weatherBanner} style={{ height: "2rem", width: "100%", backgroundColor: 'lavender' }}>
        {/*<div className={styles.locationSearch}>*/}
        {/*  <input type="text" placeholder="Search" className={styles.inputField} />*/}
        {/*  <button className={styles.findAT5Button}><i>@</i> Find a Take 5</button>*/}
        {/*</div>*/}
        
      </div>
    </header>)
};


