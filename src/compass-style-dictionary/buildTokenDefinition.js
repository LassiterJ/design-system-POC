import { isObjectWithValidation } from '../utilities/js/isObjectWithValidation.js';

// Turn the following comment into JSDocs
// @param {Object} args
// @param {Object} args.scale - The scale object to build tokens from
// Attribute	Type	Description
//   value:	Any	The value of the design token. This can be any type of data, a hex string, an integer, a file path to a file, even an object or array.
//   comment:	String (optional)	The comment attribute will show up in a code comment in output files if the format supports it.
//   themeable:	Boolean (optional)	This is used in formats that support override-able or themeable values like the !default flag in Sass.
//   name:	String (optional)	Usually the name for a design token is generated with a name transform, but you can write your own if you choose. By default, Style Dictionary will add a default name which is the key of the design token object.
//   attributes:	Object (optional)




// const buildTokenName = ({key="", keyFormatter=(key)=>key, prefix="", suffix=""}) => {
//   const formattedKey = keyFormatter(key);
//   return `compass.${prefix}${prefix && "."}${formattedKey}${suffix && "."}${suffix}`;
// }
// const buildToken = ({key="", value="", keyFormatter=(key)=>key, valueFormatter=(value)=>value, prefix="", suffix=""}) => {
//   const tokenName = buildTokenName({key, keyFormatter, prefix, suffix});
//   const formattedValue = valueFormatter({value});
//   return {[tokenName]: formattedValue};
// };
// const buildTokensFromScale = ({ scale= null , keyFormatter=(key)=>key, valueFormatter=(value)=>value, prefix="", suffix="", exclude: excludeKey = []}) => {
//   if(!scale){
//     console.error("buildTokensFromScale: scale is undefined");
//     return null;
//   };
//   // TODO: Add some sort of mapping to allow for key to be mapped to a different value than scale[key]
//   return Object.key(scale).reduce((tokens, key) => {
//     if(excludeKey.includes(key)) return tokens;
//     return Object.assign({}, tokens, buildToken({key, value: scale[key], keyFormatter, valueFormatter, prefix, suffix}));
//   }, {});
// };

// const buildToken = (path, value) => {
//   const buildNested = (path, val, obj) => {
//     let key = path.shift();
//     obj[key] = path.length ? buildNested(path, val, {}) : { value: val };
//     return obj;
//   };
//
//   return buildNested(path, value, {});
// };

const splitNonAlphanumeric = (str) => {
  const matchAllNonAlphanumericExceptDecimalFraction = /(?<!\d)[^a-zA-Z0-9.\/]+|(?<=\d)[^a-zA-Z0-9\/]+(?=[^a-zA-Z0-9\/])/g;
  return str.split(matchAllNonAlphanumericExceptDecimalFraction);
}


const mergeToken = (obj, path, value) => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = { value: value, attributes: {path} };
  return obj;
};

export const buildTokensFromScale = (args) => {
  const customValidations = [({scale}) => isObjectWithValidation(scale, { allowCustomConstructors: true })];
  const argsAreValid = isObjectWithValidation(args, { allowCustomConstructors: true, customValidations});
  
  // Validate args before processing
  if(!argsAreValid) {
    console.error("buildTokensFromScale: args are invalid");
    return null;
  }
  if (!args.scale || typeof args.scale !== 'object' || args.scale.length === 0) {
    console.error("buildTokensFromScale: 'scale' property is missing in args");
    return null;
  }
  // const argsAreValid = isObjectWithValidation(args, { allowCustomConstructors: true});
  
  
  const {
    scale,
    keyFormatter = (key) => (key),
    valueFormatter = (valueObject) => (valueObject.rawValue),
    prefix = '', // Assuming a default value for prefix if not provided
    exclude = []
  } = args;
  const tokens = {};
  
  for (const key of Object.keys(scale)) {
    
    // Skip keys in the exclude list
    if (exclude.includes(key)) continue;
    
    const isValidObject = isObjectWithValidation(scale[key],{ allowCustomConstructors: true } );
    try {
      const rawValue = isValidObject ? scale[key].value : scale[key];
      const valueObject = isValidObject ? scale[key] : null;
      
      const formattingData = { scale, prefix, exclude, rawValue, valueObject, key };
      const formattedKey = keyFormatter(key);
      const formattedValue = valueFormatter({ ...formattingData});
      const buildKeyString = prefix ? `${prefix}-${formattedKey}` : formattedKey;
      const tokenKeyStructure = splitNonAlphanumeric(buildKeyString);
      
      mergeToken(tokens, tokenKeyStructure, formattedValue);
    } catch (e) {
      console.error(`buildTokensFromScale: Error processing key '${key}': ${e.message}`);
      // Decide whether to continue processing other keys or return null/empty object
      // For now, continuing with other keys
    }
  }
  
  return tokens;
};

// Ensure that the helper functions splitNonAlphanumeric and mergeToken are defined


// module.exports = {buildTokensFromScale};
