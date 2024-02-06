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
      transformGroup: 'custom/spacing/properties',
      buildPath,
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          filter: (token) =>
            token.type === 'spacing' &&
            !['margin', 'mx', 'my', 'mt', 'me', 'mb', 'ms'].includes(
              token.path[0]
            ),
        },
      ],
    },
    customMarginUtilities: {
      transformGroup: 'custom/margin/utility-classes',
      buildPath,
      files: [
        {
          destination: 'margin.css',
          format: 'custom/css/css-classes',
          // filter: (token) => token.type === "spacing" && ["margin", "mx", "my", "mt", "me", "mb", "ms"].includes(token.path[0]),
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
