import { buildTokensFromScale } from '../../buildTokenDefinition.js';
import { fractionalSpacingScale } from './scales.js';

// Make tokens for each value of the fractionalSpacingScale
// Should look like this:
// {
//   "compass-spacing-f-1-2": { value: "50%" },
//   "compass-spacing-f-3-4": { value: "75%" },
//   ...,
//   "compass-spacing-f-full": { value: "100% },

export const fractionalSpacingTokens = buildTokensFromScale({scale: fractionalSpacingScale, prefix: "spacing-f"});
// console.log("fractionalSpacingTokens: ", fractionalSpacingTokens);
// console.log("fractionalSpacingTokens.spacing: ", fractionalSpacingTokens.spacing);
// module.exports = fractionalSpacingTokens;
