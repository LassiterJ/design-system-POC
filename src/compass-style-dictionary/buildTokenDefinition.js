


// Attribute	Type	Description
//   value:	Any	The value of the design token. This can be any type of data, a hex string, an integer, a file path to a file, even an object or array.
//   comment:	String (optional)	The comment attribute will show up in a code comment in output files if the format supports it.
//   themeable:	Boolean (optional)	This is used in formats that support override-able or themable values like the !default flag in Sass.
//   name:	String (optional)	Usually the name for a design token is generated with a name transform, but you can write your own if you choose. By default Style Dictionary will add a default name which is the key of the design token object.
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
//   // TODO: Add some sort of mapping to allow for keys to be mapped to a different value than scale[key]
//   return Object.keys(scale).reduce((tokens, key) => {
//     if(excludeKey.includes(key)) return tokens;
//     return Object.assign({}, tokens, buildToken({key, value: scale[key], keyFormatter, valueFormatter, prefix, suffix}));
//   }, {});
// };

const deepMerge = (...objects) => {
  const isObject = obj => obj && typeof obj === 'object';
  
  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key];
      const oVal = obj[key];
      
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal);
      }
      else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = deepMerge(pVal, oVal);
      }
      else {
        prev[key] = oVal;
      }
    });
    
    return prev;
  }, {});
}
const splitAndFormatKey = (key, prefix) => {
  let parts = key.includes('/') ? key.split('/').map(k => k.trim()) : [key];
  return [...prefix.split('-'), ...parts].filter(Boolean);
};

const buildNestedObject = (path, value, obj) => {
  path.reduce((acc, part, index) => {
    if (index === path.length - 1) {
      acc[part] = { value };
    } else {
      acc[part] = acc[part] || {};
    }
    return acc[part];
  }, obj);
};

const buildTokensFromScale = ({scale, keyFormatter = (key) => key, valueFormatter = (value) => value, prefix, exclude = []}) => {
  console.log("buildTokensFromScale");
  if (!scale) {
    throw new Error("buildTokensFromScale: scale is undefined");
  }
  
  const formattedPrefix = `compass-${prefix}`;
  
  const scaleKeys = Object.keys(scale);
  console.log("scaleKeys: ", scaleKeys);
  const tokens = {};
  
  // iterate through each key in the scale and build a token for it
  for(const keys of scaleKeys) {
    // if the key is in the exclude list, skip it
    if (exclude.includes(keys)) continue;
  // otherwise, format the key and value and add it to the tokens object
    const formattedKey = keyFormatter(keys);
    const formattedValue = valueFormatter(scale[keys]);
    const tokenPath = splitAndFormatKey(formattedKey, formattedPrefix);
  };
  
  
  
  return Object.keys(scale).reduce((tokens, key) => {
    if (exclude.includes(key)) return tokens;
    
    const formattedKey = keyFormatter(key);
    const tokenPath = splitAndFormatKey(formattedKey, formattedPrefix);
    const formattedValue = valueFormatter(scale[key]);
    buildNestedObject(tokenPath, formattedValue, tokens);
    return tokens;
  }, {});
};


module.exports = {buildTokensFromScale};
