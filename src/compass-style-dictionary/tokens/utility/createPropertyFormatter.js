import StyleDictionary from 'style-dictionary-esm';

const { createPropertyFormatter } = StyleDictionary.formatHelpers;
const generateCSSValue = (validatedToken) => {
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

  value = value.replace(/['"]+/g, '');
  const trailingMath = value.slice(reference.length);
  const formattedValue = !!trailingMath
    ? `calc( var( --${reference} ) ${trailingMath} )`
    : `var( --${reference} )`;
  return formattedValue;
};

const getCssRulesetPropertyReplaceFormat = (options) => {
  const cssRulesetPropertyReplaceFormat = (formatterOptions) => {
    const {
      referenceKey = 'value',
      format,
      outputReferenceFallbacks,
      prefix,
      ref,
    } = formatterOptions;
    const { name, value } = ref;
    // const isReference =
    console.log('replaceFormat: ref: ', ref);
    console.log('replaceFormat| formatterOptions: ', formatterOptions);
    // const { startNameAtCTI } = options; // Might not be necessary if I can get the transformer to pass the correct name from the start
    const { category, type, item, subitem, state } = ref.attributes;
    const ctiArray = [category, type, item, subitem];
    // console.log('replaceFormat: formatterOptions: ', formatterOptions);
    // console.log("format !== 'cssRulesetProperty': ", format !== 'cssRulesetProperty', format);
    // Early return for formats other than 'cssRulesetProperty' for now
    // if (format !== 'cssRulesetProperty' && referenceKey !== 'cti') {
    return `${prefix}${ref?.[referenceKey]}`;
    // }

    // const ctiName = startNameAtCTI
    //   ? ctiArray.splice(ctiArray.indexOf(startNameAtCTI), ctiArray.length).join('-')
    //   : ctiArray.join('-');

    // const formattedPropertyValue = outputReferenceFallbacks
    //   ? `var(${ctiName || ref.name}, ${}${ref.value})`
    //   : `var(${ctiName || ref.name})`;
    // return formattedValue;
  };
  return cssRulesetPropertyReplaceFormat;
};

const getCustomFormatOptions = (format, options) => {
  const { replaceFormatOptions } = options;
  const customFormatOptions = {
    cssRulesetProperty: {
      prefix: '',
      commentStyle: 'none',
      indentation: '   ',
      separator: ':',
      suffix: ';',
      replaceFormat: getCssRulesetPropertyReplaceFormat(),
      referenceKey: 'value',
      ...options,
    },
  };
  return customFormatOptions[format];
};

/**
 * @typedef {Object} Options  - The options object
 * @property {boolean} outputReferences - Whether to output references
 * @property {boolean} outputReferenceFallbacks - Whether to output reference fallbacks
 * @property {Object} dictionary - The dictionary object
 * @property {string} format - The format
 * @property {Object} formatting - The formatting object
 * @property {boolean} themeable - Whether the format is themeable
 * @type {{outputReferences: *, dictionary: *, outputReferenceFallbacks: *, format: *, themeable: *, formatting: *}}
 */
export const customPropertyFormatters = (options) => {
  const { format, formatting, startNameAtCTI, ...restOptions } = options;
  if (!format && !formatting) {
    console.error('customPropertyFormatters must be passed format or formatting options');
    throw new Error('customPropertyFormatters must be passed format or formatting options');
  }

  const builtInFormatStylesList = ['css', 'sass', 'less', 'stylus'];
  const formatIsBuiltIn = builtInFormatStylesList.includes(format);

  if (formatIsBuiltIn || !!formatting) {
    console.log('!!formatting: ', !!formatting);
    return createPropertyFormatter(options);
  }
  const customFormatOptions = getCustomFormatOptions(format, { referenceKey: 'value' });
  const customFormattingProperties = customFormatOptions;
  if (!customFormattingProperties) {
    console.error(`Format "${format}" not found.`);
  }

  return createPropertyFormatter({
    ...restOptions,
    formatting: customFormattingProperties,
  });
};

//
// const formatStyles = {
//   css: { prefix: '--', indentation: '  ', separator: ':' },
//   sass: { prefix: '$', commentStyle: 'short', indentation: '', separator: ':' },
//   less: { prefix: '@', commentStyle: 'short', indentation: '', separator: ':' },
//   stylus: { prefix: '$', commentStyle: 'short', indentation: '', separator: '=' },
// };
//
// const createReplacementFunction =
//   (styleConfig, format, outputReferenceFallbacks, dictionary) => (ref) => {
//     return styleConfig.replaceFormat({
//       referenceKey: styleConfig.referenceKey,
//       format,
//       outputReferenceFallbacks,
//       prefix: styleConfig.prefix,
//       ref,
//     });
//   };
//
// const replaceValueWithReference = (
//   value,
//   prop,
//   styleConfig,
//   format,
//   outputReferenceFallbacks,
//   dictionary
// ) => {
//   const refs = dictionary.getReferences(prop.original.value);
//   const replaceFunction = createReplacementFunction(
//     styleConfig,
//     format,
//     outputReferenceFallbacks,
//     dictionary
//   );
//
//   return refs.reduce((acc, ref) => {
//     const media = prop.attributes?.media;
//     const refValue = ref.value?.[media] || ref.value;
//     return acc.replace(refValue, replaceFunction(ref));
//   }, value);
// };
//
// const defaultFormatting = {
//   prefix: '',
//   commentStyle: 'none', // Options: 'none', 'short', 'long'
//   indentation: '',
//   separator: ':',
//   suffix: ';',
//   referenceKey: 'name',
//   replaceFormat: () => {},
// };
// export const createPropertyFormatter = ({
//   outputReferences = false,
//   outputReferenceFallbacks = false,
//   dictionary,
//   format,
//   formatting = {},
//   themeable = false,
// }) => {
//   // Merges default formatting with custom formatting options provided by the user
//   const styleConfig = {
//     ...defaultFormatting,
//     ...formatting,
//   };
//   // const styleConfig = { ...defaultFormatting, ...formatStyles[format] };
//
//   const formatPropertyString = (prop) => {
//     const { prefix, indentation, separator, suffix, commentStyle } = styleConfig;
//     const value =
//       outputReferences && dictionary.usesReference(prop.original.value)
//         ? replaceValueWithReference(
//             prop.value,
//             prop,
//             styleConfig,
//             format,
//             outputReferenceFallbacks,
//             dictionary
//           )
//         : prop.value;
//
//     const formattedValue = prop.attributes.category === 'asset' ? `"${value}"` : value;
//     const propertyString = `${indentation}${prefix}${prop.name}${separator} ${formattedValue}`;
//
//     let defaultSuffix = suffix;
//     if (format === 'sass' && (prop.themeable || themeable)) {
//       defaultSuffix += ' !default';
//     }
//
//     let comment = '';
//     if (prop.comment && commentStyle !== 'none') {
//       comment = commentStyle === 'short' ? ` // ${prop.comment}` : ` /* ${prop.comment} */`;
//     }
//
//     return `${propertyString}${defaultSuffix}${comment}`;
//   };
//
//   return formatPropertyString;
// };
