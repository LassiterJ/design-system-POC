import {buildTokensFromScale} from  '../../buildTokenDefinition.js';
import {coreSpacingScale} from  './scales.js';

// TODO: This might not be necessary anymore since we are using tokens from spacingTokens.json that is made with TokenStudio Plugin.

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

// export const coreSpacingTokens = buildTokensFromScale({scale: coreSpacingScale});
// export default coreSpacingTokens;
