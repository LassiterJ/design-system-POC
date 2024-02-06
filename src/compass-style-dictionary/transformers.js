import StyleDictionary from 'style-dictionary-esm';
import {
  registerTransforms,
  transforms,
  checkAndEvaluateMath,
} from '@tokens-studio/sd-transforms';
import { filterTokensByType } from './filters.js';

/* Index:
 * Helper Functions
 * Custom Transformers
 * Custom Transform Groups
 * Register the custom transformers and transform group
 * */

/* Helper Functions */

// Custom filter generators for specific or partial type matching

/* Custom Transformers */
let count = 0;

export const customNamesTransform = {
  name: 'name/cti/custom-names',
  type: 'name',
  transitive: true,
  transformer: (token, options) => {
    // return token.name;
    const { name, path } = token;
    const { prefix } = options;
    // Check for negative values and prepend 'n'
    const isNegative = name.startsWith('-');
    const subName = name.substring(1).replace(',', '-');
    const negName = `n${subName}`;
    const newName = isNegative ? negName : name.replace(',', '-');
    const pathToPrepend = path.slice(0, path.length - 1);
    pathToPrepend.push(newName);

    const finalName = pathToPrepend.join('-');

    // if(count < 2 && name.includes(",")) {
    //   console.log('token: ', token);
    //   console.log('token.name: ', token.name);
    //   console.log('token.path[0]: ', token.path);
    // console.log('subName: ', subName);
    // console.log('newName: ', newName);
    // console.log('finalName: ', finalName);
    // console.log('prefix: ', prefix);
    // console.log('pathToPrepend: ', pathToPrepend);
    //
    //   count++;
    // }

    // if(count < 2 && isNegative && token.path[0] !== 'margin') {
    //   console.log('token: ', token);
    //   console.log('token.name: ', token.name);
    //   console.log('token.path[0]: ', token.path);
    //   console.log('newName: ', newName);
    //   console.log("finalName: ", finalName);
    //   count++;
    // }

    // Apply additional logic if needed for fractions, etc.
    return finalName;
  },
};
// Convert pixel values to rem
// do not convert values that are already in rem, em, %, full, auto
// do not convert single pixel values
// convert fraction to percentage
export const customPxToRemTransformer = {
  name: 'size/customPxToRem',
  type: 'value',
  transitive: true,
  matcher: (token) => {
    const { type, path } = token;

    const blacklistedPaths = ['em', 'rem', '%', 'full', 'auto', 'margin'];
    const whitelistedTypes = ['spacing'];
    const isBlacklistedPath = !!blacklistedPaths.find((element) =>
      path.toString().includes(element)
    );

    const isMatch = whitelistedTypes.includes(type) && !isBlacklistedPath;
    return isMatch;
  },
  transformer: (token, options) => {
    // console.log(' token: ', token);
    // if(count < 2) {
    //   console.log("token: ", token);
    //   console.log("token.name: ", token.name);
    //   console.log("token.path: ", token.path);
    //   count++;
    // }
    // console.log("token.type: ", token.type);
    const resolvedValue = checkAndEvaluateMath(token.value);

    if (token.path.includes('px')) {
      return `${resolvedValue}px`;
    }
    if (token.path.toString().includes('fractional')) {
      return `${resolvedValue * 100}%`;
    }

    // Utilize the built-in 'size/pxToRem' logic for other tokens
    const pixelValue = parseFloat(resolvedValue);
    const basePxFontSize = 16; //TODO: get this from a token or configuration

    const transformedValue = `${pixelValue / basePxFontSize}rem`;
    return transformedValue;
  },
};

/* Transform Groups */

export const customSpacingPropertiesTransformGroup = {
  name: 'custom/spacing/properties',
  transforms: [
    'ts/descriptionToComment',
    'attribute/cti',
    'size/customPxToRem',
    'name/cti/kebab',
  ],
  // transforms: [ 'size/customPxToRem'].filter(transform => transform !== 'ts/size/px' && transform !== 'ts/resolveMath')
};

export const customMarginUtilityClassesTransformGroup = {
  name: 'custom/margin/utility-classes',
  transforms: [
    'ts/descriptionToComment',
    'attribute/cti',
    'name/cti/custom-names',
  ],
};

// const standardCssTransforms = StyleDictionary.transformGroup['css'];
// export const cssVariablesTransformGroup = {
//   name: 'custom/css-variables',
//   transforms: [ 'name/cti/n-for-negative', ...standardCssTransforms ]
//   // transforms: StyleDictionary.transformGroup['css'].concat([
//   //   'name/cti/n-for-negative',
//   // ]),
// };

/* Register the custom transformers and transform group */
export const registerCustomTransforms = () => {
  // Registering token studio transforms
  registerTransforms(StyleDictionary);
  StyleDictionary.registerTransform(customPxToRemTransformer);
  StyleDictionary.registerTransform(customNamesTransform);
  StyleDictionary.registerTransformGroup(customSpacingPropertiesTransformGroup);
  StyleDictionary.registerTransformGroup(
    customMarginUtilityClassesTransformGroup
  );
  // StyleDictionary.registerTransformGroup(cssVariablesTransformGroup);
};
