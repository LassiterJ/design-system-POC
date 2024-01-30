const {buildTokensFromScale} = require( '../../buildTokenDefinition.js');
const {coreSpacingScale, fractionalSpacingScale} = require( './scales.js');

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

// const coreSpacingTokens = buildTokensFromScale({scale: coreSpacingScale, keyFormatter: (key)=>key.replace(".","_"), prefix: "compass-spacing"});
// // // const fractionalSpacingTokens = buildTokensFromScale({scale: fractionalSpacingScale, keyFormatter: (key)=>key.replace("/","--"), prefix: "compass-spacing"});const coreSpacingTokens = buildTokensFromScale({scale: coreSpacingScale, keyFormatter: (key)=>key.replace(".","_"), prefix: "compass-spacing"});
const coreSpacingTokens = buildTokensFromScale({scale: coreSpacingScale, prefix: "spacing"});
const fractionalSpacingTokens = buildTokensFromScale({scale: fractionalSpacingScale, prefix: "spacing-f"});
console.log("coreSpacingTokens: ", coreSpacingTokens);
console.log("fractionalSpacingTokens: ", fractionalSpacingTokens);
// module.exports = {...coreSpacingTokens, ...fractionalSpacingTokens};
// //
module.exports = coreSpacingTokens;
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
