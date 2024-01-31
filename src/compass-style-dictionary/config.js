const StyleDictionary = require('style-dictionary');
const { customTransformGroupName } = require('./transformations');

module.exports = {
  "source": ["tokens/**/*.{js,mjs,cjs,json}"],
  "platforms": {
    "scss": {
      "transformGroup": customTransformGroupName, // Use the custom transform group
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    }
  }
}
