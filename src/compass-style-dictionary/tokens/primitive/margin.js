// import {coreSpacingScale, fractionalSpacingScale, coreSpacingTokens, fractionalSpacingTokens} from './spacing.js';
// import { buildToken, buildTokensFromScale } from '../../../utilities/js/buildTokenDefinition.js';
//
// console.log("coreSpacingTokens: ", coreSpacingTokens);
// // exports marginTokens that look like:
// // {
// //  "compass-m-0": {value: {compass.spacing.0.value}},
//
// // Need to find way to map references to other tokens.
// const buildMarginTokens = ({ prefix }) => {
//   const coreSpacingTokens = buildTokensFromScale({
//     scale: coreSpacingScale,
//     keyFormatter: (key) => key.replace(".", "_"),
//     valueFormatter: (value) => `${value},
//     prefix: prefix
//   });
//   const fractionalSpacingTokens = buildTokensFromScale({
//     scale: fractionalSpacingScale,
//     keyFormatter: (key) => key.replace("/", "--"),
//     prefix: prefix
//   });
//   const negativeCoreSpacingTokens = buildTokensFromScale({
//     scale: coreSpacingScale,
//     keyFormatter: (key) => key.replace(".", "_"),
//     valueFormatter: (value) => `-${value}`,
//     prefix: `-${prefix}`,
//     exclude: ["0"]
//   });
//   const negativeFractionalSpacingTokens = buildTokensFromScale({
//     scale: fractionalSpacingScale,
//     keyFormatter: (key) => key.replace("/", "--"),
//     valueFormatter: (value) => `-${value}`,
//     prefix: `-${prefix}`
//   });
//   const autoToken = buildToken({ key: "auto", value: "auto", prefix: "compass-spacing" });
//
//   return {
//     ...coreSpacingTokens,
//     ...fractionalSpacingTokens,
//     ...negativeCoreSpacingTokens,
//     ...negativeFractionalSpacingTokens,
//     ...autoToken}
// };
// const marginTokens = buildMarginTokens({ prefix: "compass-m" });
// const marginXTokens = buildMarginTokens({ prefix: "compass-mx" });
// const marginYTokens = buildMarginTokens({ prefix: "compass-my" });
// const marginTopTokens = buildMarginTokens({ prefix: "compass-mt" });
// const marginStartTokens = buildMarginTokens({ prefix: "compass-ms" });
// const marginBottomTokens = buildMarginTokens({ prefix: "compass-mb" });
// const marginEndTokens = buildMarginTokens({ prefix: "compass-me" });
// const marginPropDefs = {
//     ...marginTokens,
//     ...marginXTokens,
//     ...marginYTokens,
//     ...marginTopTokens,
//     ...marginStartTokens,
//     ...marginBottomTokens,
//     ...marginEndTokens
// };
// // Values are wrong. Should be corresponding spacing token reference. not raw values.
// console.log("marginPropDefs: ", marginPropDefs);
