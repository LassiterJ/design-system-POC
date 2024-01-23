


export const buildTokenName = ({key="", keyFormatter=(key)=>key, prefix="", suffix=""}) => {
  const formattedKey = keyFormatter(key);
  return `${prefix}${prefix && "-"}${formattedKey}${suffix && "-"}${suffix}`;
}
export const buildToken = ({key="", value="", keyFormatter=(key)=>key, valueFormatter=(value)=>value, prefix="", suffix=""}) => {
  const tokenName = buildTokenName({key, keyFormatter, prefix, suffix});
  return {[tokenName]: {value: valueFormatter(value)}};
};
export const buildTokensFromScale = ({ scale= null , keyFormatter=(key)=>key, valueFormatter=(value)=>value, prefix="", suffix="", exclude: excludeKey = []}) => {
  if(!scale){
    console.error("buildTokensFromScale: scale is undefined");
    return null;
  }
  
  return Object.keys(scale).reduce((tokens, key) => {
    if(excludeKey.includes(key)) return tokens;
    return Object.assign({}, tokens, buildToken({key, value: scale[key], keyFormatter, valueFormatter, prefix, suffix}));
  }, {});
};


