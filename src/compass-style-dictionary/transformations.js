import StyleDictionary from 'style-dictionary-esm';
// //
// // // Custom name transformation

const prefix = 'compass'; // TODO: get this from a token or configuration
export const addPrefixNameTransform = {
  name: 'name/prefix',
  type: 'name',
  transformer: (prop) => {
    return `${prefix}-${prop.name}`;
  }
};

// //
// // Custom transform group for SCSS with the new name transformation
// const customScss = {
//   name: 'scss/withPrefix',
//   transforms: StyleDictionary.transformGroup['scss'].concat(['name/prefix'])
// };

// // // Register the custom transformation and transform group
// // StyleDictionary.registerTransform(addPrefixNameTransform);
// // StyleDictionary.registerTransformGroup(prefixSCSSTransformGroup);
// //
// // export const scssWithPrefix = prefixSCSSTransformGroup.name;
// // export default scssWithPrefix
// //



export const customPxToRem = {
  name: 'size/customPxToRem',
  type: 'value',
  matcher: (token) => {
    const {type, path} = token;
    const pathDestination = token.path.at(-1);
    if (pathDestination.includes("px")){
      console.log("{");
      console.log("pathDestination Includes px: ", pathDestination);
      console.log("AND path includes px: ", path.toString().includes("px"));
      console.log("}");

    }
    const blacklistedPaths = ['px','em', 'rem','%', 'fractional', 'full', "auto"];
    const isBlacklistedPath = !!blacklistedPaths.find(element => path.toString().includes(element));
    
    const isMatch = type === 'size' && !isBlacklistedPath;
    return isMatch;
},
  transformer: (token, options) => {
  // Utilize the built-in 'size/pxToRem' logic for other tokens
  const pixelValue = parseFloat(token.value);
  const basePxFontSize = 16; //TODO: get this from a token or configuration
  
  const transformedValue = `${pixelValue / basePxFontSize}rem`;
  return transformedValue;
}
};

const customScss = {
  name: 'scss/custom',
  transforms: StyleDictionary.transformGroup['scss'].concat(['size/customPxToRem', 'name/prefix'])
};
const customCss = {
  name: 'css/custom',
  transforms: StyleDictionary.transformGroup['css'].concat(['size/customPxToRem', 'name/prefix'])
};

// // // Register the custom transformation and transform group
StyleDictionary.registerTransform(customPxToRem);
StyleDictionary.registerTransform(addPrefixNameTransform);
StyleDictionary.registerTransformGroup(customScss);
StyleDictionary.registerTransformGroup(customCss);

export const customScssGroup = customScss.name;
export const customCssGroup = customCss.name;
export default customScss
