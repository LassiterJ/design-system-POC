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

    const generateCSSValue = (validatedToken) => {
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

    const getMarginKeyFromToken = (token) => {
      const marginKeyLocation = token.path.indexOf('margin') + 1;
      const marginPropertyKeys = Object.keys(marginProperties);
      const elementThatMatchesKey = (element) => {
        const elementMatchesKey = token.path[marginKeyLocation] === element;
        return elementMatchesKey;
      };
      const marginKey = marginPropertyKeys.find(elementThatMatchesKey);
      return marginKey || 'm';
    };

    // Map through tokens and format them
    const formatToken = (token) => {
      // Validate token generate the CSS value
      const validatedToken = validateToken(token);
      const value = generateCSSValue(validatedToken);

      // Get the margin key from the token path
      const marginKey = getMarginKeyFromToken(validatedToken);
      const applicableProperties = marginProperties[marginKey];
      const precedingSpace = '   '; // 3 spaces to indent according to the class name

      // Format the properties
      const formattedProperties = applicableProperties
        .map((property) => {
          return `${precedingSpace}${property}: ${value};`;
        })
        .join('\n ');

      // Determine the class name
      const className = `.${validatedToken.name.replace('_', '-')}`;

      // Finally building the class
      const formattedClass = `${className} { \n ${formattedProperties} \n}`;

      return formattedClass;
    };
    // Get Margin Tokens
    const tokens = dictionary.allTokens.filter(marginFilter);

    const formattedTokens = tokens.map(formatToken);
    return formattedTokens.join('\n');
  },
};

export const registerCustomFormats = () => {
  StyleDictionary.registerFormat(generateCSSClasses);
};
