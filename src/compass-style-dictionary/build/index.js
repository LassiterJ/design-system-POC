import StyleDictionary from 'style-dictionary-esm';
import { config } from './config.js';

//  Had to do programmatically because the Style Dictionary CLI does not support the use of node modules.
// We are using style-dictionary-esm to allow for the use of node modules until Style Dictionary 4.0 is released adding the necessary support.

export const buildStyleDictionary = () => {
  const CompassStyleDictionary = StyleDictionary.extend(config);
  CompassStyleDictionary.buildAllPlatforms();
};

export default buildStyleDictionary;
