// const StyleDictionary = require('style-dictionary-esm');
// import customPxToRem from './transformations.js';
// import StyleDictionary from 'style-dictionary-esm';
import { customScssGroupName, customCssGroupName } from './transformations.js';
//
import {tokens}  from '../tokens/index.js';
import { excludeTypes } from './filters.js';
// console.log("tokens: ", JSON.stringify(tokens, null, 2));

// module.exports = {
//   "source": ["tokens/**/*.{js,mjs,cjs,json}"],
//   "platforms": {
//     "scss": {
//       // "transformGroup": scssWithPrefix
//       "transformGroup": "scss", // Use the custom transform group
//       "buildPath": "build/scss/",c
//       "files": [{
//         "destination": "_variables.scss",
//         "format": "scss/variables"
//       }]
//     }
//   }
// }

// Rather than have Style Dictionary handle the merging of token files,
// you could use node module export/require to do it yourself. This will
// allow you to not have to copy object namespaces like you normally would.
// Take a look at any of the .js files in components/ or tokens/
// TODO: trying this out because referencing the namespace for tokens with decimals or fractions in keys is not working as I had hoped. StyleDictionary's alias references are dot notation. Keys with decimals are treated as nested objects by default. This is not what we want.
// const tokens = require('./tokens');


// Helper function to get all keys from an object. Mainly for testing/debugging
// function* getAllKeys(obj, prefix = '') {
//   for (let key in obj) {
//     const currentKey = prefix ? `${prefix}.${key}` : key;
//     if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
//       yield* getAllKeys(obj[key], currentKey);
//     } else {
//       yield currentKey;
//     }
//   }
// }
// const tokensKeys = [];
//
//   tokensKeys.push(getAllKeys(tokens).next().value);

// console.log("tokensKeys: ", JSON.stringify(tokensKeys, null, 2));

// TODO: Implement a way to set these settings. Possibly through design tokens or a configuration file.
const settings = {designSystemPrefix: "compass", buildPath:'../src/compass-style-dictionary/dist/'};
const {designSystemPrefix, buildPath} = settings;

/* Out Token Types
* size: primitive spacing values
* color: primitive color values
* typography: typography values
* border: primitive border values
* elevation: primitive elevation values for shadows and z-index
* motion: primitive motion values for animations and transitions
* spacing: subset of size, these are spacing values like margin and padding
* */


// --- You can export a plain JS object and point the Style Dictionary CLI to it,
// similar to webpack.
export const config = {
    // We are relying on node modules to merge all the objects together
    // thus we only want to reference top level node modules that export
    // the whole objects.
    // source: ['tokens/index.js', 'components/index.js'],
    // source: ['tokens/index.js'],
    // If you don't want to call the registerTransform method a bunch of times
    // you can override the whole transform object directly. This works because
    // the .extend method copies everything in the config
    // to itself, allowing you to override things. It's also doing a deep merge
    // to protect from accidentally overriding nested attributes.
    /* We are using transformations.js to store and register all custom transformers and transform groups. */
    // transform: {}
    
    // Same with formats, you can now write them directly to this config
    // object. The name of the format is the key.
    format: {
      customSpacingUtilityClasses:
        (dictionary, config) => {
          return dictionary.allTokens
            .filter(token => token.attributes.category === 'utility/margin')
            .map(token => {
              return `.${token.name} { ${token.attributes.type}: ${token.value}; }`;
            })
            .join('\n');
        }
    },
    
    // You can also bypass the merging of files Style Dictionary does
    // by adding a 'tokens' object directly like this:
    //
    tokens: {...tokens},
    platforms: {
      // custom: {
      //   // Using the custom transforms we defined above
      //   transforms: ['attribute/cti', 'addPathToToken', 'myRegisteredTransform', 'color/hex'],
      //   buildPath: buildPath,
      //   files: [{
      //     destination: 'variables.yml',
      //     // Using the custom format defined above
      //     format: 'myFormat'
      //   }]
      // },
      css: {
        transformGroup: 'css/custom/variables',
        // transforms:[ 'addPathToToken', 'color/hex', 'attribute/color'],
        prefix: designSystemPrefix,
        buildPath: buildPath,
        files: [{
          destination: 'primitive-custom-properties.css',
          // options: {
          //   outputReferences: true, // If you want to reference other variables
          // },
          format: 'css/variables',
          filter: excludeTypes( 'spacing'),
        }]
      },
      
      scss: {
        transformGroup: 'scss/custom',
        prefix: designSystemPrefix,
        // transforms: ['customPxToRem'],
        buildPath: buildPath,
        files:
          [{
            destination: 'variables.scss',
            format: 'scss/variables',
            options: {
              outputReferences: true, // If you want to reference other variables
            }
          }]
      },
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
    }
  }

