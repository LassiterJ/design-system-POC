


// Attribute	Type	Description
//   value:	Any	The value of the design token. This can be any type of data, a hex string, an integer, a file path to a file, even an object or array.
//   comment:	String (optional)	The comment attribute will show up in a code comment in output files if the format supports it.
//   themeable:	Boolean (optional)	This is used in formats that support override-able or themable values like the !default flag in Sass.
//   name:	String (optional)	Usually the name for a design token is generated with a name transform, but you can write your own if you choose. By default Style Dictionary will add a default name which is the key of the design token object.
//   attributes:	Object (optional)

const buildTokenName = ({key="", keyFormatter=(key)=>key, prefix="", suffix=""}) => {
  const formattedKey = keyFormatter(key);
  return `${prefix}${prefix && "-"}${formattedKey}${suffix && "-"}${suffix}`;
}
const buildToken = ({key="", value="", keyFormatter=(key)=>key, valueFormatter=(value)=>value, prefix="", suffix=""}) => {
  const tokenName = buildTokenName({key, keyFormatter, prefix, suffix});
  const formattedValue = valueFormatter({value});
  return {[tokenName]: formattedValue};
};
const buildTokensFromScale = ({ scale= null , keyFormatter=(key)=>key, valueFormatter=(value)=>value, prefix="", suffix="", exclude: excludeKey = []}) => {
  if(!scale){
    console.error("buildTokensFromScale: scale is undefined");
    return null;
  };
  
  return Object.keys(scale).reduce((tokens, key) => {
    if(excludeKey.includes(key)) return tokens;
    return Object.assign({}, tokens, buildToken({key, value: scale[key], keyFormatter, valueFormatter, prefix, suffix}));
  }, {});
};

module.exports = {buildToken, buildTokensFromScale, buildTokenName};
