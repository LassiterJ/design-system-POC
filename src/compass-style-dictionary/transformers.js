import StyleDictionary from 'style-dictionary-esm';
import {
  registerTransforms,
  expandComposites,
  checkAndEvaluateMath,
} from '@tokens-studio/sd-transforms';
import { formatString } from '../utilities/js/formatString.js';
import isObjectWithValidation from '../utilities/js/isObjectWithValidation.js';

/* Index:
 * Helper Functions
 * Custom Transformers
 * Custom Transform Groups
 * Register the custom transformers and transform group
 * */

/* Helper Functions */

// list of token types and the cti their names should start with;
const tokenTypeCTINameStart = {
  position: 'type',
  padding: 'item',
  margin: 'item',
  inset: 'type', // TODO: Consider adding x and y insets
  top: 'type',
  end: 'type',
  bottom: 'type',
  start: 'type',
  width: 'type',
  'max-width': 'type',
  'min-width': 'type',
  height: 'type',
  'max-height': 'type',
  'min-height': 'type',
  'flex-shrink': 'type',
  'flex-grow': 'type',
  display: 'type',
};

const getFormattedCTIListFromStartCTI = (ctiStart, CTIs) => {
  // TODO: Probably need to split this up into smaller functions if we need to.
  const CTIKeys = ['category', 'type', 'item', 'subitem', 'state'];
  const CTIKeysToUseList = CTIKeys.slice(CTIKeys.indexOf(ctiStart));
  const ctiList = CTIKeysToUseList.map((key) => {
    const ctiValue = CTIs[key];
    if (!ctiValue) {
      return;
    }
    const processNegative = ctiValue.startsWith('-') ? `n${ctiValue.substring(1)}` : ctiValue;
    const formattedCTIValue = processNegative.replace(',', '-');

    return [key, formattedCTIValue];
  }).filter(Boolean); // List of CTI tuples to use in the name.

  return ctiList;
};

let count = 0; //TODO remove this
/* Custom Transformers */
export const customKebabCaseNameTransformer = {
  name: 'name/custom/cti/kebab-case',
  type: 'name',
  transitive: true,
  transformer: (token, options) => {
    // const { name } = token;
    const exceptionCategories = ['css-properties'];
    const { category, type, item, subitem, state } = token.attributes;
    const ctiStart = exceptionCategories.includes(category)
      ? 'category'
      : tokenTypeCTINameStart[type] || 'category';
    const ctiList = getFormattedCTIListFromStartCTI(ctiStart, {
      // TODO: Might not want all CTIs after start. Might want to filter out some. Ex. "spacing-special-auto" to "spacing-auto". Either rename or filter.
      category,
      type,
      item,
      subitem,
      state,
    });
    const ctiName = ctiList.map((cti) => cti[1]).join('-');
    // console.log('ctiName: ', ctiName);
    return ctiName;
  },
};
export const customCamelCaseNameTransformer = {
  name: 'name/custom/cti/camel-case',
  type: 'name',
  transitive: true,
  transformer: (token, options) => {
    // const { name } = token;
    const exceptionCategories = ['css-properties'];
    const { category, type, item, subitem, state } = token.attributes;
    const ctiStart = exceptionCategories.includes(category)
      ? 'category'
      : tokenTypeCTINameStart[type] || 'category';
    const ctiList = getFormattedCTIListFromStartCTI(ctiStart, {
      // TODO: Might not want all CTIs after start. Might want to filter out some. Ex. "spacing-special-auto" to "spacing-auto". Either rename or filter.
      category,
      type,
      item,
      subitem,
      state,
    });
    const makeNameCamelCase = (name) => {
      return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    };
    const ctiName = ctiList.map((cti) => makeNameCamelCase(cti[1])).join('-');
    // console.log('ctiName: ', ctiName);
    return ctiName;
  },
};
export const customHumanReadableNameTransformer = {
  name: 'name/custom/cti/human-readable',
  type: 'name',
  transitive: true,
  transformer: (token, options) => {
    // transform the name to be human readable
    const { name } = token;
    const { category, type, item, subitem, state } = token.attributes;
    const ctiList = [category, type, item, subitem, state];
    const structuredName = ctiList.filter(Boolean).join(' ');

    return formatString(structuredName, 'formatToHumanReadable');
  },
};

// Convert pixel values to rem
// do not convert values that are already in rem, em, %, full, auto
// do not convert single pixel values
// convert fraction to percentage
export const isNumericString = (value) => {
  // Define a regular expression for a valid number (integer or decimal without leading zeros, except for "0" or "0.x").
  const validNumberRegex = /^(0|([1-9]\d*))(\.\d+)?$/;
  const valueIsAStringValidNumberString = typeof value === 'string' && validNumberRegex.test(value);
  // Check if the value is a string that matches the valid number format or a number type.
  return valueIsAStringValidNumberString;
};
export const tokenValueHasANumericString = (value) => {
  const tokenValueIsAnObject = isObjectWithValidation(value);

  if (!tokenValueIsAnObject && !isNumericString(value)) {
    return;
  }

  if (!tokenValueIsAnObject && isNumericString(value)) {
    return true;
  }

  return Object.values(value).some((val) => isNumericString(val));
};

export const customPxToRemTransformer = {
  name: 'size/custom/px-to-rem',
  type: 'value',
  transitive: true,
  matcher: (token) => {
    const { type, path, attributes, value, name, original } = token;

    const blacklistedPaths = ['em', 'rem', '%', 'full', 'auto', 'margin'];
    const whitelistedCategories = ['spacing', 'components'];
    const isBlacklistedPath = !!blacklistedPaths.find((item) => path.toString().includes(item));
    // const isValueANumericString = tokenValueHasANumericString(value);
    // if (attributes.category === 'spacing') {
    //   console.group('spacing token: ');
    //   console.log('token: ', token);
    //   // console.log('isValueANumericString: ', isValueANumericString);
    //   console.groupEnd();
    // }
    const isMatch =
      // tokenValueHasANumericString(value) &&
      whitelistedCategories.includes(attributes?.category) && !isBlacklistedPath;

    // console.log('customPxToRemTransformer | isMatch: ', isMatch);
    // console.groupEnd();

    return isMatch;
  },
  transformer: (token, options) => {
    if (!token) {
      console.error("customPxToRemTransformer: first argument is required. 'token' is undefined");
      return;
    }

    // if (!tokenValueHasANumericString(token.value)) {
    //   console.error(
    //     'customPxToRemTransformer: tokenValue is not a string or object with a string value'
    //   );
    //   return;
    // }

    const transformValue = (value) => {
      const resolvedValue = checkAndEvaluateMath(value);
      // if (token.attributes.item === '0') {
      //   return `${resolvedValue}`;
      // }
      if (token.attributes.item === 'px') {
        return `${resolvedValue}px`;
      }
      if (token.attributes.type === 'fractional') {
        return `${resolvedValue * 100}%`;
      }

      const pixelValue = parseFloat(resolvedValue);
      if (Number.isNaN(pixelValue)) {
        return value;
      }
      const basePxFontSize = 16; //TODO: get this from a token or configuration

      const transformedValue = `${pixelValue / basePxFontSize}rem`;
      return transformedValue;
    };
    // if value is an object, transform the values
    if (!isObjectWithValidation(token.value)) {
      // console.log('!isObjectWithValidation(token.value), token.value: ', token.value);
      return transformValue(token.value);
    }

    // return the object with the values transformed
    const transformedObject = {};
    for (const key in token.value) {
      const value = token.value[key];
      if (typeof value !== 'string') {
        console.error(
          'customPxToRemTransformer: value object is nested. Check to make sure its correct. If this is expected, refactor the transformer to handle nested objects'
        );
        return;
      }
      transformedObject[key] = transformValue(value);
    }
    return transformedObject;
  },
};

/* Transform Groups */
export const customCSSTransformGroup = {
  name: 'custom/css/standard',
  transforms: ['attribute/cti', 'name/custom/cti/kebab-case'],
};

export const customCSSPropertiesTransformGroup = {
  name: 'custom/css/properties',
  transforms: ['attribute/cti', 'size/custom/px-to-rem', 'name/custom/cti/kebab-case'],
  // transforms: [ 'size/custom/px-to-rem'].filter(transform => transform !== 'ts/size/px' && transform !== 'ts/resolveMath')
};

export const customCSSLayoutPropertiesTransformGroup = {
  name: 'custom/css/layout-properties',
  transforms: [
    // 'ts/descriptionToComment',
    'attribute/cti',
    'size/custom/px-to-rem',
    'name/custom/cti/kebab-case',
  ],
  // transforms: [ 'size/custom/px-to-rem'].filter(transform => transform !== 'ts/size/px' && transform !== 'ts/resolveMath')
};

export const customMarginUtilityClassesTransformGroup = {
  name: 'custom/spacing/utility-classes',
  transitive: true,
  transforms: [
    // 'ts/descriptionToComment',
    'attribute/cti',
    'name/custom/cti/kebab-case',
  ],
};

export const customTestTransformGroup = {
  name: 'custom/utility/transformed-tokens',
  transforms: ['attribute/cti', 'name/custom/cti/human-readable', 'size/custom/px-to-rem'],
};

export const customJSTransformGroup = {
  name: 'custom/js/standard',
  transforms: ['attribute/cti', 'size/custom/px-to-rem'],
};

/* Register the custom transformers and transform group */
export const registerCustomTransforms = () => {
  // Registering token studio transforms
  registerTransforms(StyleDictionary);
  StyleDictionary.registerTransform(customPxToRemTransformer);
  StyleDictionary.registerTransform(customKebabCaseNameTransformer);
  StyleDictionary.registerTransform(customCamelCaseNameTransformer);
  StyleDictionary.registerTransform(customHumanReadableNameTransformer);
  StyleDictionary.registerTransformGroup(customCSSTransformGroup);
  StyleDictionary.registerTransformGroup(customJSTransformGroup);
  StyleDictionary.registerTransformGroup(customCSSPropertiesTransformGroup);
  StyleDictionary.registerTransformGroup(customTestTransformGroup);
  StyleDictionary.registerTransformGroup(customCSSLayoutPropertiesTransformGroup);
  StyleDictionary.registerTransformGroup(customMarginUtilityClassesTransformGroup);
};
