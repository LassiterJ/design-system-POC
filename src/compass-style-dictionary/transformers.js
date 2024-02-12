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
  inset: 'type',
  top: 'type',
  right: 'type',
  bottom: 'type',
  left: 'type',
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
export const customNamesTransformer = {
  name: 'name/cti/custom-names',
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

// Convert pixel values to rem
// do not convert values that are already in rem, em, %, full, auto
// do not convert single pixel values
// convert fraction to percentage
export const customPxToRemTransformer = {
  name: 'size/customPxToRem',
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

export const customCSSClassTransformGroup = {
  name: 'custom/css/classes',
  transforms: ['attribute/cti', 'name/cti/custom-names'],
};

export const customSpacingPropertiesTransformGroup = {
  name: 'custom/css/properties',
  transforms: [
    // 'ts/descriptionToComment',
    'attribute/cti',
    'size/customPxToRem',
    'name/cti/custom-names',
  ],
  // transforms: [ 'size/customPxToRem'].filter(transform => transform !== 'ts/size/px' && transform !== 'ts/resolveMath')
};

export const customCSSLayoutPropertiesTransformGroup = {
  name: 'custom/css/layout/properties',
  transforms: [
    // 'ts/descriptionToComment',
    'attribute/cti',
    'size/customPxToRem',
    'name/cti/custom-names',
  ],
  // transforms: [ 'size/customPxToRem'].filter(transform => transform !== 'ts/size/px' && transform !== 'ts/resolveMath')
};

export const customMarginUtilityClassesTransformGroup = {
  name: 'custom/spacing/utility-classes',
  transitive: true,
  transforms: [
    // 'ts/descriptionToComment',
    'attribute/cti',
    'name/cti/custom-names',
  ],
};

export const customTestTransformGroup = {
  name: 'custom/transformation/test',
  transforms: ['attribute/cti', 'name/cti/custom-names'],
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
  StyleDictionary.registerTransform(customNamesTransformer);
  // StyleDictionary.registerTransform(customLayoutNamesTransformer);
  StyleDictionary.registerTransformGroup(customSpacingPropertiesTransformGroup);
  StyleDictionary.registerTransformGroup(customTestTransformGroup);
  StyleDictionary.registerTransformGroup(customCSSLayoutPropertiesTransformGroup);
  StyleDictionary.registerTransformGroup(customMarginUtilityClassesTransformGroup);
  // StyleDictionary.registerTransformGroup(cssVariablesTransformGroup);
};
