const {buildTokensFromScale} = require( '../../buildTokenDefinition.js');
const {coreSpacingScale} = require( './scales.js');

// Make tokens for each value of the coreSpacingScale
// Should look like this:
// {
//   "compass-spacing-0": { value: "0px" },
//   "compass-spacing-px": { value: "1px" },
//   "compass-spacing-.5": { value: "0.125rem" },
//   "compass-spacing-1": { value: "0.25rem" },
//   "compass-spacing-1.5": { value: "0.375rem" },
//   "compass-spacing-2": { value: "0.5rem" },
//   ...

const coreSpacingTokens = buildTokensFromScale({scale: coreSpacingScale, prefix: "spacing"});
console.log("coreSpacingTokens: ", coreSpacingTokens);
console.log("coreSpacingTokens.compass.spacing[1]: ", coreSpacingTokens.compass.spacing[1]);

module.exports = coreSpacingTokens
// module.exports = {
//     "compass": {
//       "spacing": {
//         "f": {
//           "1" : {
//             "2":{ "value": "50%" },
//         },
//       }
//     }
//   }
// }
