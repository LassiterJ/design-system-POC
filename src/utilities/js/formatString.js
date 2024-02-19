import isObjectWithValidation from './isObjectWithValidation.js';

const toKebabCase = (str) => {
  return (
    str
      // First, handle camelCase and PascalCase by adding a space before capital letters
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      // Replace spaces, underscores, and multiple hyphens with a single hyphen
      .replace(/[\s_]+/g, '-')
      // Convert to lowercase
      .toLowerCase()
  );
};
const decimalsToHyphens = (str) => str.replace(/\./g, '-');
const fractionsToUnderScores = (str) => str.replace(/\//g, '_');
const negativesToN = (str) => (str.startsWith('-') ? `n${str.slice(1)}` : str);
const prefixWithDoubleHyphens = (str) => str.replace(/\//g, '--');
const commasToDecimals = (str) => str.replace(/,/g, '.');
const underscoreToFractions = (str) => str.replace(/_/g, '/');

const formatToCustomCSSProperty = {
  decimalsToHyphens,
  fractionsToUnderScores,
  negativesToN,
  prefixWithDoubleHyphens,
};
const formatToCSSPropertyName = {
  decimalsToHyphens,
  fractionsToUnderScores,
  negativesToN,
  toKebabCase,
};

const formatToCustomCSSClassSyntax = {
  decimalsToHyphens,
  fractionsToUnderScores,
  negativesToN,
};

const formatToHumanReadable = {
  commasToDecimals,
  underscoreToFractions,
};

const builtInFormats = {
  formatToCustomCSSProperty: formatToCustomCSSProperty,
  formatToCustomCSSClassSyntax: formatToCustomCSSClassSyntax,
  formatToHumanReadable: formatToHumanReadable,
  formatToCSSPropertyName: formatToCSSPropertyName,
};

const getFormatValues = (format) => {
  // if format is object, return Object.values(format);
  if (isObjectWithValidation(format)) {
    // console.log('isObjectWithValidation(format): ', format);
    return Object.values(format);
  }
  // if format is array make sure it is an array of functions and return format
  if (Array.isArray(format) && format.every((item) => typeof item === 'function')) {
    return format;
  }
  // if format is string, check if formatter exists and return Object.values(builtInFormats[format])
  if (typeof format === 'string' && builtInFormats[format]) {
    return Object.values(builtInFormats[format]);
  }
  // else return nothing(undefined);
};
export const formatString = (str, format, config) => {
  if (!str) {
    console.error(`formatString: first argument 'str' is required `);
    return str;
  }
  if (!format) {
    console.error(`formatString: second argument 'format' is required `);
    return str;
  }
  const formatValues = getFormatValues(format);
  if (!formatValues) {
    console.error(`formatString: 'format' argument, ${format}, is not valid `);
    return str;
  }
  // console.log('formatValues: ', formatValues);
  const formattedString = formatValues.reduce((acc, formatter) => formatter(acc), str);
  return formattedString;
};
