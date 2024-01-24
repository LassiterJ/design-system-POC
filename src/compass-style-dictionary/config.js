const StyleDictionary = require('style-dictionary');

// const brands = [`brand-1`, `brand-2`, `brand-3`];
// brands.forEach(brand => {
//   StyleDictionary.extend({
//
//   }).buildAllPlatforms();
// });
// StyleDictionary.extend({
//   "source": ["tokens/**/*.{js,mjs,cjs,json}"],
//     "transform": {
//     "skipNameTransform": {
//       'type':'name',
//         'transformer': function(token) {
//         return token.original.name;
//       }
//     }
//   },
//   "platforms": {
//     "scss": {
//       "transformGroup": "scss",
//         "buildPath": "build/scss/",
//         "files": [{
//         "destination": "_variables.scss",
//         "format": "scss/variables"
//       }]
//     }
//   }
// });
// const util = require('util');
// console.log(util.inspect(StyleDictionary, { showHidden: false, depth: null }));

// console.log("StyleDictionary.extend: ", StyleDictionary.extend());

// StyleDictionary.buildAllPlatforms();
module.exports = {
  "source": ["tokens/**/*.{js,mjs,cjs,json}"],
  // "transform": {
  //   "skipNameTransform": {
  //     'type':'name',
  //     "transitive": true,
  //     'transformer': function(token) {
  //       return token.original.name;
  //     }
  //   }
// },
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    }
  }
}
