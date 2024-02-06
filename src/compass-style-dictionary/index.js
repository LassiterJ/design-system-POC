import { registerCustomTransforms } from './transformers.js';
import { registerCustomFormats } from './formatters.js';
import StyleDictionary from 'style-dictionary-esm';
import { config } from './config.js';

/* Register Custom Transforms and TransformGroups */
registerCustomTransforms();

/* Register Custom Formatters*/
registerCustomFormats();

/* Build Style Dictionary */
const CompassStyleDictionary = StyleDictionary.extend(config);
CompassStyleDictionary.buildAllPlatforms();
