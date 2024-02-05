// const StyleDictionary = require('style-dictionary-esm');
// import customPxToRem from './transformations.js';
// import StyleDictionary from 'style-dictionary-esm';

import { customScssGroupName, customCssGroupName } from './transformations.js';
//
// import {tokens}  from '../tokens/index.js';
import { excludeTypes } from './filters.js';

// Rather than have Style Dictionary handle the merging of token files,
// we use node module export/require to do it yourself. This will
// allow us to not have to copy object namespaces like you normally would. TODO: this behavior may change in Style Dictionary 4.0
// Take a look at any of the .js files in primitive/ or utility/

// TODO: Implement a way to set these settings. Possibly through design tokens or a configuration file.
const settings = {
  designSystemPrefix: 'compass',
  buildPath: './src/compass-style-dictionary/dist/',
  tokensPath: ['./src/compass-style-dictionary/tokens/token-studio/*.json'],
};
const { designSystemPrefix, buildPath, tokensPath } = settings;

/* Our Token Types
primitive, semantic, and token categories
* size: spacing tokens
* spacing: subset of size, these are spacing tokens like margin and padding
* color: color tokens
* typography: typography tokens
* border: border tokens
* elevation: elevation tokens for shadows and z-index
* motion: motion tokens for animations and transitions
* */

// --- You can export a plain JS object and point the Style Dictionary CLI to it,
// similar to webpack.
export const config = {
  // We are relying on node modules to merge all the objects together
  // thus we only want to reference top level node modules that export
  // the whole objects.

  /* importing tokens directly. commenting this out for now:
    source: ['tokens/index.js', 'components/index.js'],
  */
  source: tokensPath,
  // format: {
  //   customSpacingUtilityClasses: (dictionary, config) => {
  //     return dictionary.allTokens
  //       .filter((token) => token.type === 'spacing')
  //       .map((token) => {
  //         // console.log("customSpacingUtilityClasses| token: ", token);
  //         const propertyMap = {
  //           //TODO: When working on rtl support, this will need to be updated to switch the values for left and right
  //           y: ['top', 'bottom'],
  //           x: ['left', 'right'],
  //           t: ['top'],
  //           e: ['right'],
  //           b: ['bottom'],
  //           s: ['left'],
  //         };
  //         const cssPropertiesToAdd = propertyMap[token.path[0][-1]];
  //         console.log('cssPropertiesToAdd: ', cssPropertiesToAdd);
  //         const css = `.${token.name} { ${token.type}: ${token.value}; }`;
  //         console.log('css: ', css);
  //       })
  //       .join('\n');
  //   },
  // },

  // You can also bypass the merging of files Style Dictionary does
  // by adding a 'tokens' object directly like this:
  // tokens: {...tokens},
  platforms: {
    // css: {
    //   transformGroup: 'css/custom/variables',
    //   // transforms:[ 'addPathToToken', 'color/hex', 'attribute/color'],
    //   prefix: designSystemPrefix,
    //   buildPath: buildPath,
    //   files: [
    //     {
    //       destination: 'primitive-custom-properties.css',
    //       // options: {
    //       //   outputReferences: true, // If you want to reference other variables
    //       // },
    //       format: 'css/variables',
    //       // filter: excludeTypes('spacing'),
    //     },
    //     // {
    //     //   destination: 'margin.css',
    //     //   options: {
    //     //     outputReferences: true, // If you want to reference other variables
    //     //   },
    //     //   format: 'customSpacingUtilityClasses',
    //     //   // filter: excludeTypes( 'size'),
    //     // },
    //   ],
    // },
    css: {
      transformGroup: 'tokens-studio',
      buildPath: buildPath,
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
    // scss: {
    //   transformGroup: 'scss/custom',
    //   prefix: designSystemPrefix,
    //   // transforms: ['customPxToRem'],
    //   buildPath: buildPath,
    //   files: [
    //     {
    //       destination: 'variables.scss',
    //       format: 'scss/variables',
    //       options: {
    //         outputReferences: true, // If you want to reference other variables
    //       },
    //     },
    //   ],
    // },
    //
    // js: {
    //   transforms: StyleDictionary.transformGroup.js.concat('myRegisteredTransform'),
    //   buildPath: buildPath,
    //   // If you want to get super fancy, you can use node modules
    //   // to create a tokens object first, and then you can
    //   // reference attributes of that object. This allows you to
    //   // output 1 file per color namespace.
    //   // files: Object.keys(tokens.color).map((colorType) => ({
    //   //   destination: `${colorType}.js`,
    //   //   format: 'javascript/es6',
    //   //   // Filters can be functions that return a boolean
    //   //   filter: (token) => token.attributes.type === colorType
    //   // }))
    //   files: [{
    //     destination: 'variables.js',
    //     format: 'javascript/es6'
    //   }]
    // },

    // You can still use built-in transformGroups and formats like before
    // json: {
    //   transformGroup: 'js',
    //   buildPath: buildPath,
    //   files: [{
    //     destination: 'tokens.json',
    //     format: 'json'
    //   }]
    // }
  },
};
