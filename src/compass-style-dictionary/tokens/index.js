import { spacingTokens } from './primitive/index.js';
import { utilityTokens } from './utility/index.js';

console.log("spacingTokens: ", spacingTokens);
const {marginTokens} = utilityTokens;
export const tokens = {spacing:{...spacingTokens}, margin:{...marginTokens}};

// export * from './primitive/index.js';
// export * from './utility/index.js';
