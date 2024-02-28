import StyleDictionary from 'style-dictionary-esm';
import { writeJSONStringToFile } from '../utilities/js/fileSystemHelpers.js';
import { customPropertyFormatters } from './tokens/utility/createPropertyFormatter.js';
import isObjectWithValidation from '../utilities/js/isObjectWithValidation.js';
import { formatString } from '../utilities/js/formatString.js';
const { sortByReference, sortByName, createPropertyFormatter, fileHeader } =
  StyleDictionary.formatHelpers;
let count = 0;

const marginProperties = {
  m: ['margin'],
  mx: ['margin-left', 'margin-right'],
  my: ['margin-top', 'margin-bottom'],
  mt: ['margin-top'],
  mb: ['margin-bottom'],
  ms: ['margin-left'], // TODO: implement rtl
  me: ['margin-right'], // TODO: implement rtl
};
const paddingProperties = {
  p: ['padding'],
  px: ['padding-left', 'padding-right'],
  py: ['padding-top', 'padding-bottom'],
  pt: ['padding-top'],
  pb: ['padding-bottom'],
  ps: ['padding-left'], // TODO: implement rtl
  pe: ['padding-right'], // TODO: implement rtl
};
const getCSSPropertiesByType = (token, key) => {
  const { type, item } = token.attributes;
  //TODO: I have configSettings for various types in various places. I should consolidate them.
  if (!key || !type) {
    console.log('getCSSPropertiesByType: key is undefined | token: ', token);
    return null;
  }
  if (type === 'margin') {
    return marginProperties[key];
  }
  if (type === 'padding') {
    return paddingProperties[key];
  }
  if (type === 'position') {
    return [type];
  }
  if (type === 'inset') {
    return [type];
  }
  if (type === 'top') {
    return [type];
  }
  if (type === 'end') {
    return ['right'];
  }
  if (type === 'bottom') {
    return [type];
  }
  if (type === 'start') {
    return ['left'];
  }
  if (type === 'width') {
    return [type];
  }
  if (type === 'min-width') {
    return [type];
  }
  if (type === 'max-width') {
    return [type];
  }
  if (type === 'height') {
    return [type];
  }
  if (type === 'min-height') {
    return [type];
  }
  if (type === 'max-height') {
    return [type];
  }
  if (type === 'flex-shrink') {
    return [type];
  }
  if (type === 'flex-grow') {
    return [type];
  }
  if (type === 'display') {
    return [type];
  }
  if (type === 'flex') {
    if (item === 'display') {
      return ['display'];
    }
    if (item === 'gap') {
      return ['gap'];
    }
    if (item === 'direction') {
      return ['flex-direction'];
    }
    if (item === 'align') {
      return ['align-items'];
    }
    if (item === 'justify') {
      return ['justify-content'];
    }
    if (item === 'wrap') {
      return ['flex-wrap'];
    }
  }
  if (type === 'container') {
    if (item === 'display') {
      return ['display'];
    }
  }
  return [type];
  // console.log('No type match for getCSSPropertiesByType |  type, key: ', type, key);
}; //TODO: try to get the properties from the token itself or config.

export const cssClassFormatter = {
  name: 'custom/css/css-classes',
  formatter: ({ dictionary, options }) => {
    // console.log('custom/css/css-classes | options: ', options);

    // const insetProperties = {
    //   inset: ['inset'],
    //   insetx: ['left', 'right'],
    //   insety: ['top', 'bottom'],
    //   top: ['top'],
    //   bottom: ['bottom'],
    //   left: ['left'], // TODO: implement rtl
    //   right: ['right'], // TODO: implement rtl
    // };

    const validateToken = (token) => {
      if (!token.name) {
        console.error('validateToken: Token does not have a name', token);
      }
      if (!token.attributes?.category) {
        console.error('validateToken: Token does not have a category', token);
      }
      if (!token.value) {
        console.error('validateToken: Token does not have a value', token);
      }
      if (!token.original) {
        console.error('validateToken: Token does not have an original object', token);
      }

      return token;
    };

    const generateCSSValue = (validatedToken) => {
      // check if tokenValue is an object
      const { original } = validatedToken;

      // check if token uses a reference
      const tokenUsesReference = dictionary.usesReference(validatedToken.original.value);
      // if it does, get the references and replace the value with the reference name
      const references = dictionary.getReferences(validatedToken.original.value);

      let value = JSON.stringify(validatedToken.value);
      let reference = '';
      if (tokenUsesReference) {
        references.forEach((ref) => {
          value = value.replace(ref.value, function () {
            return `${ref.name}`;
          });
          reference = ref.name;
        });
      }
      if (validatedToken.attributes.category === 'components')
        console.log('generateCSSValue | value | references: ', value, references);
      value = value.replace(/['"]+/g, '');
      const trailingMath = value.slice(reference.length);
      const formattedValue = !!trailingMath
        ? `calc( var( --${reference} ) ${trailingMath} )`
        : `var( --${reference} )`;

      return formattedValue;
    };
    const generateResponsiveStyles = (token) => {
      const { name, attributes } = token;
      const ctiToUse = [
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'flex-grow',
        'flex-shrink',
        'display',
        'flex',
        'container',
        'inset',
        'top',
        'end',
        'bottom',
        'start',
        'position',
      ].includes(attributes.type)
        ? attributes.type
        : attributes.item;
      const properties = getCSSPropertiesByType(token, ctiToUse);
      const rootCustomProperties = properties
        .map((property) => {
          return [
            `--${property}-compact:0;`,
            `--${property}-medium:0;`,
            `--${property}-expanded:0;`,
          ].join('\n  ');
        })
        .join('');
      const baseClassPropertiesDefinition = properties
        .map((property) => {
          return `${property}: var(--${property});`;
        })
        .join('\n          ');
      const responsiveDefinition = (breakpoint) =>
        properties
          .map((property) => {
            return `${property}: var(--${property}-${breakpoint});`;
          })
          .join('\n            ');
      const propertyClassName = ctiToUse;
      const responsiveStyles = `:root {
  ${rootCustomProperties}
}
.${propertyClassName}{
  ${baseClassPropertiesDefinition}
}

@include compact {
  .compact\\:${propertyClassName} {
    ${responsiveDefinition('compact')}
  }
}

@include medium {
  .medium\\:${propertyClassName} {
    ${responsiveDefinition('medium')}
  }
}

@include expanded {
  .expanded\\:${propertyClassName} {
    ${responsiveDefinition('expanded')}
  }
}`;
      return responsiveStyles;
    };

    // Map through tokens and format them
    const formatToken = (token) => {
      // Validate token generate the CSS value
      const validatedToken = validateToken(token);
      const { type, item, originalValue } = validatedToken.attributes;
      // if (!item) {
      //   console.log('validatedToken without item: ', validatedToken);
      // }

      const value = generateCSSValue(validatedToken);
      if (validatedToken.attributes.category === 'components') {
        console.log('validatedToken.name | generated value: ', validatedToken.name, value);
      }

      // Get css properties by token attribute "type"
      const applicableProperties = getCSSPropertiesByType(validatedToken, item);

      const precedingSpace = '   '; // 3 spaces to indent according to the class name

      // Format the properties
      const formattedProperties = applicableProperties
        ?.map((property) => {
          return `${precedingSpace}${property}: ${value};`;
        })
        .join('\n ');
      const { name } = validatedToken;
      // Finally building the class
      const formattedClass = `.${name} { \n ${formattedProperties} \n}`;
      return formattedClass;
    };
    // Get Tokens
    const tokenAttributesFilter = (token) => {
      const { matchAttributes = undefined } = options;

      if (!matchAttributes) return true;
      let returnValue = false;
      for (const key in matchAttributes) {
        const valueIsArray = Array.isArray(matchAttributes[key]);
        const isEmptyArray = valueIsArray && matchAttributes[key].length <= 0;
        let tempValue = false;
        if (!matchAttributes[key] || isEmptyArray) {
          tempValue = true;
        }
        if (valueIsArray) {
          tempValue = matchAttributes[key].includes(token.attributes[key]);
        }
        if (token.attributes[key] === matchAttributes[key]) {
          tempValue = true;
        }
        returnValue = tempValue;
      }
      return returnValue;
    };

    const tokens = dictionary.allTokens
      .sort(sortByReference) // TODO: make a custom sort function so that output is consistent with the core scale tokens
      .filter(tokenAttributesFilter);

    // try {
    //   const fileDirectoryFromRoot = 'src/compass-style-dictionary/tokens/utility';
    //   const currentFilePath = process.cwd();
    //   console.log('currentFilePath: ', currentFilePath);
    //
    //   writeJSONStringToFile({
    //     jsonString: JSON.stringify(tokens, null, 2),
    //     fileName: 'marginAndPaddingTokens',
    //     path: fileDirectoryFromRoot,
    //   });
    // } catch (error) {
    //   console.error('Error writing marginTokens to file: ', error);
    // }
    // console.log('tokens.length: ', tokens.length);
    const generateResponsiveClasses = (tokens) => {
      const responsiveStyles = {};
      tokens.forEach((token) => {
        const { name, attributes } = token;
        // const { category, type, item } = attributes;
        const ctiToUse = [
          'width',
          'min-width',
          'max-width',
          'height',
          'min-height',
          'max-height',
          'flex-grow',
          'flex-shrink',
          'display',
          'flex',
          'container',
          'inset',
          'top',
          'end',
          'bottom',
          'start',
          'position',
        ].includes(attributes.type)
          ? attributes.type
          : attributes.item;
        if (attributes.type === 'height') {
          console.log('ctiToUse for height: ', ctiToUse);
        }
        if (!responsiveStyles[ctiToUse]) {
          responsiveStyles[ctiToUse] = generateResponsiveStyles(token);
        }
      });
      return Object.values(responsiveStyles).join('\n');
    };

    const formattedTokens = tokens.map(formatToken);
    const responsiveStyles = generateResponsiveClasses(tokens);
    return `@import "../../styles/breakpoints.scss";\n ${responsiveStyles}\n${formattedTokens.join(
      '\n'
    )}`;
  },
};

export const primitiveScalesJSFormatter = {
  name: 'custom/js/primitive-scales',
  formatter: function (dictionary, options) {
    const coreObj = {};
    const fractionalObj = {};
    dictionary.allTokens.forEach((token) => {
      const { name, attributes } = token;
      const { category, type, item } = attributes;
      if (category !== 'spacing' || !['core', 'fractional'].includes(type)) {
        console.log('filter for primitiveScalesJSFormatter formatter is not working');
        return;
      }

      const obj = type === 'core' ? coreObj : fractionalObj;
      const formattedName = name.replace('_', '/').replace(',', '.');
      const key = `${formattedName}`;

      obj[key] = token.value.replace(/['"]+/g, '');
    });

    // Convert obj to JS export string
    const coreScaleExport = `export const primitiveCoreScale = ${JSON.stringify(
      coreObj,
      null,
      2
    )};`;
    const fractionalScaleExport = `export const primitiveFractionalScale = ${JSON.stringify(
      fractionalObj,
      null,
      2
    )};`;

    return `${coreScaleExport}\n\n${fractionalScaleExport}`;
  },
};

export const componentCSSClassFormatter = {
  name: 'custom/css/component/css-utility-classes',
  formatter: ({ dictionary, options }) => {
    const validateToken = (token) => {
      if (!token.name) {
        console.error('validateToken: Token does not have a name', token);
      }
      if (!token.attributes?.category) {
        console.error('validateToken: Token does not have a category', token);
      }
      if (!token.value) {
        console.error('validateToken: Token does not have a value', token);
      }
      if (!token.original) {
        console.error('validateToken: Token does not have an original object', token);
      }

      return token;
    };
    const formatPropertyName = (propertyName) => {
      const formattedString = formatString(propertyName, 'formatToCSSPropertyName');
      if (!formattedString)
        console.error(
          `ERROR: formatPropertyName failed to format the propertyName: ${propertyName}`,
          formattedString
        );
      return formattedString;
    };
    const formatPropertyValue = (originalPropertyValue, transformedPropertyValue) => {
      if (!originalPropertyValue) {
        console.error(
          'formatPropertyValue requires originalPropertyValue to be the first argument: ',
          originalPropertyValue
        );
        return;
      }

      const propertyValueHasReferences = dictionary.usesReference(originalPropertyValue);
      if (!propertyValueHasReferences) {
        // console.log(
        //   '!propertyValueHasReferences | originalPropertyValue, transformedPropertyValue: ',
        //   originalPropertyValue,
        //   transformedPropertyValue
        // );
        return transformedPropertyValue;
      }
      const references = dictionary.getReferences(originalPropertyValue);
      let value = JSON.stringify(originalPropertyValue);
      let reference = '';

      // console.log('references: ', references);
      references.forEach((ref) => {
        value = value.replace(ref.value, function () {
          return `${ref.name}`;
        });
        reference = ref.name;
      });

      // if (validatedToken.attributes.category === 'components')
      //   console.log('generateCSSValue | value | references: ', value, references);
      value = value.replace(/['"]+/g, '');
      const removeQuotesAndCurlyBraces = (str) => str.replace(/['"{}]+/g, '');
      const removeQuotes = (str) => str.replace(/['"]+/g, '');
      const valueString = propertyValueHasReferences
        ? removeQuotesAndCurlyBraces(value)
        : removeQuotes(value);
      // console.log('formatPropertyValue | valueString,reference: ', valueString, reference);
      const trailingMath = valueString.slice(reference.length);
      const formattedValue = !!trailingMath
        ? `calc( var( --${reference} ) ${trailingMath} )`
        : `var( --${reference} )`;
      return formattedValue;
    };
    const format = (token) => {
      // process the token. Separating the token into its parts
      // console.log('token: ', token);
      const validatedToken = validateToken(token);
      const { value, original, attributes } = validatedToken;
      const { value: originalValue } = original;

      // Iterate through the value object, getting the css property and value and returning them formatted

      const propertyValueTuples = (valueObject) => {
        if (!isObjectWithValidation(valueObject)) {
          console.error('valueObject is not an object: ', token, typeof token.value);
          return;
        }

        const tuples = Object.entries(originalValue).map((entry, index) => {
          const propertyName = formatPropertyName(entry[0]);
          const propertyValue = formatPropertyValue(entry[1], Object.entries(value)[index][1]);
          return [propertyName, propertyValue];
        });
        return tuples;
      };

      // If the token has multipleValues
      const multiValueString = (val) =>
        propertyValueTuples(val)
          .map((tuple) => {
            return `${tuple[0]}: ${tuple[1]};`;
          })
          .join('\n');
      const { item } = attributes;

      // If the token has a single value. //Does not have properties that are objects. TODO: Figure out better way to get properties and names from tokens or config
      const propertyByType = getCSSPropertiesByType(validatedToken, item);
      const formattedValueString = formatPropertyValue(originalValue, value);
      const singleValueString = `${propertyByType}: ${formattedValueString};`;
      const propertyValueString =
        typeof value === 'string' ? singleValueString : multiValueString(value);

      const { name } = validatedToken;
      const formattedName = name.split('-').slice(1).join('-'); // remove the category from cti name. TODO: find way to specify this for transformers.
      // format name to take camelCase items and make them kebab-case
      //Build the css class
      return `.${formattedName} { \n ${propertyValueString} \n}`;
    };

    const tokenAttributesFilter = (token) => {
      const { matchAttributes = undefined } = options;
      if (!matchAttributes) return true;
      const shouldMatch = (key, token) => {
        // if the token has no attribute that matches the key return false
        // if matchAttributes[key] starts with '!' then the token should be skipped.
        // if matchAttributes[key] is an array, then try to find the token attribute in the array, if it is there, make sure it is not negated. If not present or negated, return false,
        const valueIsArray = Array.isArray(matchAttributes[key]);
        if (!valueIsArray) {
          return (
            !matchAttributes[key].startsWith('!') && matchAttributes[key] === token.attributes[key]
          );
        }
        const matchIndex = matchAttributes[key].indexOf(token.attributes[key]);
        const isNegated = matchAttributes[key][matchIndex].startsWith('!');
        console.log('isNegated, key, token.name: ', isNegated, key, token.name);
        return !isNegated;
      };

      let returnValue = false;
      for (const key in matchAttributes) {
        // const isMatcher = shouldMatch(key, token);
        const valueIsArray = Array.isArray(matchAttributes[key]);
        const isEmptyArray = valueIsArray && matchAttributes[key].length <= 0;
        let tempValue = false;
        // if (!isMatcher) {
        //   return false;
        // }
        if (!matchAttributes[key] || isEmptyArray) {
          tempValue = true;
        }
        if (token.attributes.item === 'asChild') {
          return false;
        }
        if (valueIsArray) {
          tempValue = matchAttributes[key].includes(token.attributes[key]);
        }
        if (token.attributes[key] === matchAttributes[key]) {
          tempValue = true;
        }
        returnValue = tempValue;
      }
      return returnValue;
    };

    const tokens = dictionary.allTokens
      .sort(sortByReference) // TODO: make a custom sort function so that output is consistent with the core scale tokens
      .filter(tokenAttributesFilter);
    const formattedTokens = tokens.map(format);
    return formattedTokens.join('\n');
  },
};

export const registerCustomFormats = () => {
  StyleDictionary.registerFormat(cssClassFormatter);
  StyleDictionary.registerFormat(primitiveScalesJSFormatter);
  StyleDictionary.registerFormat(componentCSSClassFormatter);
};
