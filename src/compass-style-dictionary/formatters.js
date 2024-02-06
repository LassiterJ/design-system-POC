import StyleDictionary from 'style-dictionary-esm';

let count = 0;
export const generateCSSClasses = {
  name: 'custom/css/css-classes',
  formatter: ({ dictionary, options }) => {
    const marginFilter = (token) => {
      return (
        token.attributes.type === 'spacing' &&
        ['margin', 'm', 'mx', 'my', 'mt', 'mb', 'ms', 'me'].includes(
          token.attributes.category
        )
      );
    };

    // Get Margin Tokens
    const tokens = dictionary.allTokens.filter(marginFilter);

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
        console.error(
          'validateToken: Token does not have an original object',
          token
        );
      }
      if (!token.type) {
        console.error('validateToken: Token does not have a type', token);
      }
      // if (!token.item) {
      //   console.warn('validateToken: Token does not have an item', token);
      // }
      return token;
    };
    // Map through tokens and format them
    const formatToken = (token) => {
      // Validate token and get token name, category, value, original value, type, and item;
      const validatedToken = validateToken(token);

      // Determine the value
      const getValue = (validatedToken) => {
        // check if token uses a reference
        const tokenUsesReference = dictionary.usesReference(
          validatedToken.original.value
        );
        // if it does, get the references and replace the value with the reference name
        const references = dictionary.getReferences(
          validatedToken.original.value
        );

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

        // const mathSymbols = ['+', '-', '*', '/'];
        // This regex looks for arithmetic operators (+, -, *, /) that are not part of a kebab-case string.
        // It avoids matching a hyphen that is directly followed by a lowercase letter (which is common in kebab-case).
        // const mathRegex = /[\+\*\/]|\-(?![a-z])/;
        // const tokenUsesMath = mathRegex.test(value);
        value = value.replace(/['"]+/g, '');
        const trailingMath = value.slice(reference.length);
        const formattedValue = !!trailingMath
          ? `calc( var( --${reference} ) ${trailingMath} )`
          : `var( --${reference} )`;
        return formattedValue;
      };

      const marginProperties = {
        m: ['margin'],
        mx: ['margin-left', 'margin-right'],
        my: ['margin-top', 'margin-bottom'],
        mt: ['margin-top'],
        mb: ['margin-bottom'],
        ms: ['margin-left'], // TODO: implement rtl
        me: ['margin-right'], // TODO: implement rtl
      };
      const value = getValue(validatedToken);
      const marginKeyLocation = validatedToken.path.indexOf('margin') + 1;
      const marginKey = Object.keys(marginProperties).find(
        (element) => validatedToken.path[marginKeyLocation] === element
      )
        ? validatedToken.path[marginKeyLocation]
        : 'm';
      const applicableProperties = marginProperties[marginKey];
      const precedingSpace = '   '; // 3 spaces to indent according to the class name
      const formattedProperties = applicableProperties
        .map((property) => {
          return `${precedingSpace}${property}: ${value};`;
        })
        .join('\n ');
      // Determine the class name
      const className = `.${validatedToken.name.replace('_', '-')}`;

      // Finally building the class
      const formattedClass = `${className} { \n ${formattedProperties} \n}`;
      // console.log('formattedClass: ', formattedClass);
      return formattedClass;
    };

    const formattedTokens = tokens.map(formatToken);
    return formattedTokens.join('\n');
  },
};

export const registerCustomFormats = () => {
  StyleDictionary.registerFormat(generateCSSClasses);
};
