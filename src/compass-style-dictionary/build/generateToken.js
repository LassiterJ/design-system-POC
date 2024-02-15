

/* When necessary, use these function to generate tokens.
  These functions just validates the passed in options and builds the objects
  to be used in the Style Dictionary configuration or TokenStudio respectively

 Here are the options/token properties:
* value: 	Any	The value of the design token. This can be any type of data, a hex string, an integer, a file path to a file, even an object or array.
* comment:	String (optional)	The comment attribute will show up in a code comment in output files if the format supports it.
* themeable:	Boolean (optional)	This is used in formats that support override-able or themable values like the !default flag in Sass.
* name:	String (optional)	Usually the name for a design token is generated with a name transform, but you can write your own if you choose. By default Style Dictionary will add a default name which is the key of the design token object.
* attributes:	Object (optional)	Extra information about the design token you want to include. Attribute transforms will modify this object so be careful
**  our attributes{
*  description: String (optional)	A description of the design token. This is used in formats that support comments.
*  referenceTokenPath: Array (optional) An array of strings that represent the path to the reference token that this token aliases.
*
* }
* */
export const generateStyleDictionaryToken = (options) => { // When taking from token studio there is a custom transformer from Token Studio that will transform the token to the Style Dictionary format.
  const {
    name,
    value,
    description,
    comment = description,
    attributes,
    referenceTokenPath,
    ...rest } = options;
  
  if(!value) throw new Error('Token must have a value');
  return {
    name,
    value,
    comment,
    attributes: {description, referenceTokenPath, ...attributes},
    rest
  };
}

/*
* Creating multiple tokens in Token Studio manually is a pain.
* This function will help generate the tokens in the format that Token Studio expects.
* Especially useful for generating tokens for repeating patterns. Like in utility classes like margin or padding.
*
* */
export const generateTokenStudioToken = (options) => {
  const {
    name,
    value,
    type,
    comment = "",
    description = comment,
    attributes,
    referenceTokenPath,
    ...rest } = options;
  
  if(!value || !type) throw new Error('Token must have a value');
  return {
    value,
    type,
    parent,
    description,
  };
}
