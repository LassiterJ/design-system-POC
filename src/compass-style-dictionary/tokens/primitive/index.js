// module.exports = {
//     coreSpacingTokens: require('./coreSpacing'),
//     fractionalSpacingTokens: require('./fractionalSpacing'),
//     scales: require('./scales')
// }

import {coreSpacingTokens} from './coreSpacing.js';
import {fractionalSpacingTokens} from './fractionalSpacing.js';

export {coreSpacingTokens} from './coreSpacing.js';
export {fractionalSpacingTokens} from './fractionalSpacing.js';
// console.log("coreSpacingTokens[0]: ", coreSpacingTokens);
export const spacingTokens = {...coreSpacingTokens, ...fractionalSpacingTokens};
