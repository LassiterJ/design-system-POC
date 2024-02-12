// Rather than have Style Dictionary handle the merging of token files,
// we use node module export/require to do it yourself. This will
// allow us to not have to copy object namespaces like you normally would. TODO: this behavior may change in Style Dictionary 4.0
// Take a look at any of the .js files in primitive/ or utility/

/* Our Token Types
primitive, semantic, and token categories
* size: spacing tokens
* spacing: subset of size, these are spacing tokens like margin and padding
* color: color tokens
* typography: typography tokens
* border: tokens for element borders
* elevation: elevation tokens for shadows and z-index
* motion:  tokens for animations and transitions
* */

// TODO: Implement a way to set these settings. Possibly through design tokens or a configuration file.
const settings = {
  designSystemPrefix: 'compass',
  buildPath: './src/compass-style-dictionary/dist/',
  tokensPath: ['./src/compass-style-dictionary/tokens/token-studio/*.json'],
};
const { designSystemPrefix, buildPath, tokensPath } = settings;

export const config = {
  source: tokensPath,
  platforms: {
    css: {
      transformGroup: 'custom/css/properties',
      buildPath,
      files: [
        {
          destination: 'primitive-spacing-variables.css',
          format: 'css/variables',
          filter: (token) => {
            const isAuto = token.attributes.item === 'auto';
            const isScale = ['core', 'fractional'].includes(token.attributes.type);
            const isNotNumberCategory = token.attributes.category !== 'numbers';
            return (isAuto || isScale) && isNotNumberCategory;
          },
        },
      ],
    },
    primitiveLayoutCSSProperties: {
      transformGroup: 'custom/css/layout/properties',
      buildPath,
      files: [
        {
          destination: 'primitive-layout-variables.css',
          format: 'css/variables',
          filter: (token) => {
            const isPosition =
              token.attributes.type === 'position' &&
              token.attributes.category === 'css-properties';
            return isPosition;
          },
        },
      ],
    },
    customUtilityClasses: {
      transformGroup: 'custom/spacing/utility-classes',
      buildPath,
      files: [
        {
          destination: 'margin.css',
          format: 'custom/css/css-classes',
          /* Filtering throws error because Style Dictionary needs the
           referenced tokens even though they are not included in the output.
           */
          options: {
            outputReferences: true,
            includeInOutput: { type: 'margin' }, // Uses token.attributes to match tokens to
          },
        },
        {
          destination: 'padding.css',
          format: 'custom/css/css-classes',
          /* Filtering throws error because Style Dictionary needs the
           referenced tokens even though they are not included in the output.
           */
          options: {
            outputReferences: true,
            includeInOutput: { type: 'padding' },
          },
        },
        {
          destination: 'inset.css',
          format: 'custom/css/css-classes',
          /* Filtering throws error because Style Dictionary needs the
           referenced tokens even though they are not included in the output.
           */
          options: {
            outputReferences: true,
            includeInOutput: { type: ['inset', 'top', 'right', 'bottom', 'left'] },
          },
        },
        {
          destination: 'layout.css',
          format: 'custom/css/css-classes',
          /* Filtering throws error because Style Dictionary needs the
           referenced tokens even though they are not included in the output.
           */
          options: {
            outputReferences: true,
            includeInOutput: { category: ['css-layout-properties'] },
            startNameAtCTI: 'type',
          },
        },
      ],
    },
    transformedTokens: {
      transformGroup: 'custom/transformation/test',
      buildPath,
      files: [
        {
          destination: 'testingTokens.json',
          format: 'json',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
