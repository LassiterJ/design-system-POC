import StyleDictionary from 'style-dictionary-esm';
import { registerTransforms, transforms, checkAndEvaluateMath } from '@tokens-studio/sd-transforms';

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
  height: 'type',
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
    const normalizingFunctions = {
      commasToDecimals: (str) => str.replace(/,/g, '.'),
      underscoreToFractions: (str) => str.replace(/_/g, '/'),
    };
    // console.log('token.name: ', token.name);
    const normalizeString = (str) => {
      // console.log('normalizeString | str: ', str);
      const normalizers = Object.values(normalizingFunctions);
      return normalizers.reduce((acc, normalizer) => normalizer(acc), str);
    };
    // console.log('normalizeString(name): ', normalizeString(name));
    // const ctiName = ctiList.map((cti) => normalizeString(cti[1]));
    // console.log('ctiName: ', ctiName);
    return normalizeString(structuredName);
  },
};

// Convert pixel values to rem
// do not convert values that are already in rem, em, %, full, auto
// do not convert single pixel values
// convert fraction to percentage
export const customPxToRemTransformer = {
  name: 'size/custom/px-to-rem',
  type: 'value',
  transitive: true,
  matcher: (token) => {
    const { type, path, attributes } = token;

    const blacklistedPaths = ['em', 'rem', '%', 'full', 'auto', 'margin'];
    const whitelistedCategories = ['spacing'];
    const isBlacklistedPath = !!blacklistedPaths.find((element) =>
      path.toString().includes(element)
    );

    const isMatch = whitelistedCategories.includes(attributes?.category) && !isBlacklistedPath;
    return isMatch;
  },
  transformer: (token, options) => {
    const resolvedValue = checkAndEvaluateMath(token.value);

    if (token.attributes.item === 'px') {
      return `${resolvedValue}px`;
    }
    if (token.attributes.type === 'fractional') {
      return `${resolvedValue * 100}%`;
    }

    const pixelValue = parseFloat(resolvedValue);
    const basePxFontSize = 16; //TODO: get this from a token or configuration

    const transformedValue = `${pixelValue / basePxFontSize}rem`;
    return transformedValue;
  },
};

/* Transform Groups */
export const customCSSTransformGroup = {
  name: 'custom/css/standard',
  transforms: ['attribute/cti', 'name/custom/cti/kebab-case'],
};

export const customCSSPropertiesTransformGroup = {
  name: 'custom/css/properties',
  transforms: [
    // 'ts/descriptionToComment',
    'attribute/cti',
    'size/custom/px-to-rem',
    'name/custom/cti/kebab-case',
  ],
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
