import StyleDictionary from 'style-dictionary-esm';
import { registerTransforms } from '@tokens-studio/sd-transforms';

// Registering token studio transforms
registerTransforms(StyleDictionary);
/* Custom Transformers */
export const customPxToRemTransformer = {
  name: 'size/customPxToRem',
  type: 'value',
  matcher: (token) => {
    const { type, path } = token;
    const pathDestination = token.path.at(-1);
    // if (pathDestination.includes("px")){
    //   console.log("{");
    //   console.log("pathDestination Includes px: ", pathDestination);
    //   console.log("AND path includes px: ", path.toString().includes("px"));
    //   console.log("}");
    //
    // }
    const blacklistedPaths = ['em', 'rem', '%', 'fractional', 'full', 'auto'];
    const whitelistedTypes = ['size', 'primitive/size'];
    const isBlacklistedPath = !!blacklistedPaths.find((element) =>
      path.toString().includes(element)
    );

    const isMatch = whitelistedTypes.includes(type) && !isBlacklistedPath;
    return isMatch;
  },
  transformer: (token, options) => {
    if (token.path.includes('px')) {
      return `${token.value}px`;
    }
    // Utilize the built-in 'size/pxToRem' logic for other tokens
    const pixelValue = parseFloat(token.value);
    const basePxFontSize = 16; //TODO: get this from a token or configuration

    const transformedValue = `${pixelValue / basePxFontSize}rem`;
    return transformedValue;
  },
};

const customScssTransformGroup = {
  name: 'scss/custom',
  transforms: StyleDictionary.transformGroup['scss'].concat([
    'size/customPxToRem',
  ]),
};
const customCssTransformGroup = {
  name: 'css/custom/variables',
  transforms: StyleDictionary.transformGroup['css'].concat([
    'size/customPxToRem',
  ]),
};

/* Register the custom transformers and transform group*/
StyleDictionary.registerTransform(customPxToRemTransformer);
StyleDictionary.registerTransformGroup(customScssTransformGroup);
StyleDictionary.registerTransformGroup(customCssTransformGroup);
/* Export transformGroup names */
export const customScssGroupName = customScssTransformGroup.name;
export const customCssGroupName = customCssTransformGroup.name;
