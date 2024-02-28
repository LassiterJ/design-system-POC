import { useEffect } from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import styles from './Header.module.scss';
import Logo from '/src/logo.svg?react';
import { useAppData } from '../../smart/app-state/AppStateProvider';
import useElementSize from '../../../../hooks/useElementSize';
import useUpdateElementSize from '../../../../hooks/useUpdateElementSize';
import Box from '../../layout/box/Box.jsx';
import Flex from '../../layout/flex/Flex.jsx';

export const Header = () => {
  const headerRef = useUpdateElementSize('header');
  return (
    <header ref={headerRef} className={styles.header}>
      <Flex
        justify="between"
        align="center"
        width="full"
        height="16"
        style={{ backgroundColor: '#8BA6BF' }}
      ></Flex>
    </header>
  );
};

{
  /*<Box className={styles.linksAndLogosContainer}>*/
}
{
  /*  <Box*/
}
{
  /*    className={styles.logoContainer}*/
}
{
  /*    style={{ height: '2rem', width: '2rem', backgroundColor: 'indianred' }}*/
}
{
  /*  >*/
}
{
  /*    /!*<AspectRatio ratio={1}>*!/*/
}
{
  /*    /!*  <Logo className={styles.logo}/>*!/*/
}
{
  /*    /!*</AspectRatio>*!/*/
}
{
  /*  </Box>*/
}
{
  /*  <nav*/
}
{
  /*    className={styles.links}*/
}
{
  /*    style={{*/
}
{
  /*      height: '2rem',*/
}
{
  /*      width: '100%',*/
}
{
  /*      backgroundColor: 'maroon',*/
}
{
  /*    }}*/
}
{
  /*  >*/
}
{
  /*    {' '}*/
}
{
  /*    /!*TODO: Replace with Base implementation of Radix's Navigation Menu Component*!/*/
}
{
  /*    /!*<a href="#">Oil Change</a>*!/*/
}
{
  /*    /!*<a href="#">Car Wash</a>*!/*/
}
{
  /*    /!*<a href="#">About Us</a>*!/*/
}
{
  /*    /!*<a href="#">Careers</a>*!/*/
}
{
  /*    /!*<a href="#">Contact</a>*!/*/
}
{
  /*    /!*<a href="#">Blog</a>*!/*/
}
{
  /*  </nav>*/
}
{
  /*</Box>*/
}
{
  /*<div*/
}
{
  /*  className={styles.locationSearchContainer}*/
}
{
  /*  style={{ height: '2rem', width: '100%', backgroundColor: 'aqua' }}*/
}
{
  /*>*/
}
{
  /*  /!*<div className={styles.locationSearch}>*!/*/
}
{
  /*  /!*  <input type="text" placeholder="Search" className={styles.inputField} />*!/*/
}
{
  /*  /!*  <button className={styles.findAT5Button}><i>@</i> Find a Take 5</button>*!/*/
}
{
  /*  /!*</div>*!/*/
}
{
  /*</div>*/
}
{
  /*<div*/
}
{
  /*  className={styles.weatherBanner}*/
}
{
  /*  style={{ height: '2rem', width: '100%', backgroundColor: 'lavender' }}*/
}
{
  /*>*/
}
{
  /*  /!*<div className={styles.locationSearch}>*!/*/
}
{
  /*  /!*  <input type="text" placeholder="Search" className={styles.inputField} />*!/*/
}
{
  /*  /!*  <button className={styles.findAT5Button}><i>@</i> Find a Take 5</button>*!/*/
}
{
  /*  /!*</div>*!/*/
}
{
  /*</div>*/
}
