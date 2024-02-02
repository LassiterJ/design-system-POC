// const StyleDictionary = require('style-dictionary-esm');
// import customPxToRem from './transformations.js';
import StyleDictionary from 'style-dictionary-esm';
import { customScssGroup } from './transformations.js';
//
import {tokens}  from './tokens/index.js';
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

const buildPath = './src/compass-style-dictionary/dist/';
//
// --- You can still add custom transforms and formats like you
// normally would and reference them in the config below.

/*
StyleDictionary.registerTransform({
  name: 'myRegisteredTransform',
  type: 'value',
  matcher: (token) => token.attributes.category === 'size',
  transformer: (token) => `${parseInt(token.value) * 16}px`
});

StyleDictionary.registerFormat({
  name: 'myRegisteredFormat',
  formatter: ({ dictionary }) => {
    return dictionary.allTokens.map((token) => token.value).join('\n');
  }
})

 */
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
    transform:
      {
        // Now we can use the transform 'addPathToToken' below
        // addPathToToken: {
        //   type: 'value',
        //   transformer:
        //     (token) => {
        //       token.attributes.path = token.attributes.path.join('_').toUpperCase();
        //       console.log("addPathToToken | newTokenWithPath: ", JSON.stringify(token, null, 2));
        //     }
        // },
        // customPxToRem:{
        //   name: 'size/customPxToRem',
        //   type: 'value',
        //   matcher: (token) => {
        //     // Exclude tokens based on specific conditions
        //     return token.type === 'size' && token.value.includes('px') && token.name !== 'px' && !token.name.includes('_');
        //   },
        //   transformer: (token, options) => {
        //     console.log("size/customPxToRem | token: ", token);
        //
        //     // Directly use pixel value for 'px' token or fractional values
        //     if (token.name === 'px' || token.name.includes(',')) {
        //       return token.value;
        //     }
        //     // Utilize the built-in 'size/pxToRem' logic for other tokens
        //     const pixelValue = parseFloat(token.value);
        //     return `${pixelValue / options.basePxFontSize}rem`;
        //   }
        // },
        // CTITransform: {
        //   type: 'attribute',
        //   transformer:
        //     (prop) => {
        //       // console.log("CTITransform | prop: ", prop);
        //       return prop;
        //       // const {path} = token.attributes;
        //       // console.log("addPathToToken | token: ", token);
        //       // return {category:"margin", type: path[path -1]};
        //     }
        // }
      }
    ,
    // Same with formats, you can now write them directly to this config
    // object. The name of the format is the key.
    format: {
      // myFormat: ({ dictionary }) => {
      //   return dictionary.allTokens.map(token => `${token.name}: ${token.value}`).join('\n');
      // }
    }
    ,
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
      // css: {
      //   transformGroup: 'css',
      //   transforms:[ 'addPathToToken', 'color/hex', 'attribute/color'],
      //   buildPath: buildPath,
      //   files: [{
      //     destination: 'custom-properties.css',
      //     format: 'css/variables'
      //   }]
      // },
      
      scss: {
        // This works, we can create new transform arrays on the fly and edit built-ins
        // transforms: StyleDictionary.transformGroup.scss.concat('color/rgb'),
        // transformGroup: "scss", // Use the custom transform group
        transformGroup: 'scss/custom',
        // transforms: ['customPxToRem'],
        buildPath: buildPath,
        files:
          [{
            destination: 'variables.scss',
            format: 'scss/variables'
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

  //  Had to do programatically because the Style Dictionary CLI does not support the use of node modules.
  // We are using style-dictionary-esm to allow for the use of node modules until Style Dictionary 4.0 is released adding the necessary support.
const MyStyleDictionary = StyleDictionary.extend(config);

MyStyleDictionary.buildAllPlatforms();

