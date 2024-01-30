const {ThemeMerger} = require("../utilities/js/ThemeMerge");


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


const splitNonAlphanumeric = (str) => {
  const matchAllNonAlphanumericExceptDecimalFraction = /(?<!\d)[^a-zA-Z0-9]+(?!\/?\d)/g;
  return str.split(matchAllNonAlphanumericExceptDecimalFraction);
}


const buildToken = (path, value) => {
  const buildNested = (path, val, obj) => {
    let key = path.shift();
    obj[key] = path.length ? buildNested(path, val, {}) : { value: val };
    return obj;
  };
  
  return buildNested(path, value, {});
};

const mergeToken = (obj, path, value) => {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = { value: value };
  return obj;
};

const buildTokensFromScale = ({scale, keyFormatter = (key) => key, valueFormatter = (value) => value, prefix, exclude = []}) => {
  // console.log("buildTokensFromScale");
  if (!scale) {
    throw new Error("buildTokensFromScale: scale is undefined");
  }
  const libraryPrefix = "compass";
  // const formattedPrefix = `${libraryPrefix}-${prefix}`;
  
  const scaleKeys = Object.keys(scale);
  // console.log("scaleKeys: ", scaleKeys);
  const tokens = {};
  
  // iterate through each key in the scale and build a token for it
  for(const keys of scaleKeys) {
    // if the key is in the exclude list, skip it
    if (exclude.includes(keys)) continue;
    // otherwise, format the key and value and add it to the tokens object
    const formattedPrefix = `${libraryPrefix}-${prefix}`;
    const formattedKey = keyFormatter(keys);
    const formattedValue = valueFormatter(scale[keys]);
    const tokenKeyStructure = splitNonAlphanumeric(`${formattedPrefix}-${formattedKey}`);
    if(formattedKey.includes(".")){
    console.log("tokenKeyStructure: ", tokenKeyStructure);
    }
   // Add token to tokens object
    mergeToken(tokens, tokenKeyStructure, formattedValue);
   //  const token = buildToken(tokenKeyStructure, formattedValue);
   //  console.log("new token: ", token);
    // add token to tokens object
    // TODO: add logic to add new token to existing tokens object in the correct place
  };
  
  // console.log("tokens: ", tokens);
  return tokens;
};


module.exports = {buildTokensFromScale};
