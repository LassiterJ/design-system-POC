// const StyleDictionary = require('style-dictionary');
// const { customTransformGroupName } = require('./transformations');
import StyleDictionary from 'style-dictionary';
// import { customTransformGroupName } from './transformations';
import * as tokens  from './tokens/index.js';
// module.exports = {
//   "source": ["tokens/**/*.{js,mjs,cjs,json}"],
//   "platforms": {
//     "scss": {
//       "transformGroup": customTransformGroupName, // Use the custom transform group
//       "buildPath": "build/scss/",
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

const buildPath = 'dist/';

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
        // Now we can use the transform 'myTransform' below
        addPathToToken: {
          type: 'name',
          transformer:
            (token) => token.path.join('_').toUpperCase()
        }
      }
    ,
    // Same with formats, you can now write them directly to this config
    // object. The name of the format is the key.
    format: {
      myFormat: ({ dictionary }) => {
        return dictionary.allTokens.map(token => `${token.name}: ${token.value}`).join('\n');
      }
    }
    ,
    // You can also bypass the merging of files Style Dictionary does
    // by adding a 'tokens' object directly like this:
    //
    tokens: tokens,
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
        transformGroup: "scss",
        transforms:
          ['attribute/cti', 'color/hex', 'attribute/color'],
        buildPath: buildPath,
        files:
          [{
            destination: 'variables.scss',
            format: 'scss/variables'
          }]
      }
      ,
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

  export default config;
