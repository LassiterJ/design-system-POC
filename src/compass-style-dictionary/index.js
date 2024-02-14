import StyleDictionary from 'style-dictionary-esm';
import { registerCustomTransforms } from './transformers.js';
import { registerCustomFormats } from './formatters.js';
import { registerCustomActions } from './actions.js';
import { config, configSettings } from './config.js';
import { removeDirectoryContentsIfExists } from '../utilities/js/fileSystemHelpers.js';

/* Register Custom Transforms and TransformGroups */
registerCustomTransforms();

/* Register Custom Formatters*/
registerCustomFormats();

/* Register Custom Actions*/
registerCustomActions();

// clear the console
console.clear();

// Delete the contents of the dist folder if it exists
const distPath = configSettings.buildPath;
removeDirectoryContentsIfExists(distPath).then((r) => 'Deleted dist folder contents.');

/* Build Style Dictionary */
const CompassStyleDictionary = StyleDictionary.extend(config);
CompassStyleDictionary.buildAllPlatforms();
