// // // const {coreSpacingScale, fractionalSpacingScale, coreSpacingTokens, fractionalSpacingTokens} = require('./coreSpacing.js');
// const {coreSpacingScale, fractionalSpacingScale} = require('./scales.js');
// const { buildTokensFromScale } = require( '../../buildTokenDefinition.js');
// //
// // console.log("coreSpacingTokens: ", coreSpacingTokens);
// // // exports marginTokens that look like:
// // // {
// // //  "m-0": {value: {compass.spacing.0.value}},
// //
// // // Need to find way to map references to other tokens.
// const buildMarginTokens = ({ prefix }) => {
//   // const coreSpacingTokens = buildTokensFromScale({
//   //   scale: coreSpacingScale,
//   //   keyFormatter: (key) => key.replace(".", "_"),
//   //   valueFormatter: (value) => `${value},
//   //   prefix: prefix
//   // });
//   const path = `{compass.spacing.${prefix}}`;
//
//   const fractionalSpacingTokens = buildTokensFromScale({
//     scale: fractionalSpacingScale,
//     // keyFormatter: (key) => key.replace("/", "--"),
//     prefix: prefix
//   });
//   // const negativeCoreSpacingTokens = buildTokensFromScale({
//   //   scale: coreSpacingScale,
//   //   keyFormatter: (key) => key.replace(".", "_"),
//   //   valueFormatter: (value) => `-${value}`,
//   //   prefix: `-${prefix}`,
//   //   exclude: ["0"]
//   // });
//   const negativeFractionalSpacingTokens = buildTokensFromScale({
//     scale: fractionalSpacingScale,
//     // keyFormatter: (key) => key.replace("/", "--"),
//     // valueFormatter: (value) => `{spacing-f-${value}}`,
//     prefix: `-${prefix}`
//   });
//   // const autoToken = buildToken({ key: "auto", value: "auto", prefix: "spacing" });
//
//   return {
//     // ...coreSpacingTokens,
//     ...fractionalSpacingTokens,
//     // ...negativeCoreSpacingTokens,
//     ...negativeFractionalSpacingTokens,
//     // ...autoToken
//   }
// };
// const marginTokens = buildMarginTokens({ prefix: "m" });
// const marginXTokens = buildMarginTokens({ prefix: "mx" });
// const marginYTokens = buildMarginTokens({ prefix: "my" });
// const marginTopTokens = buildMarginTokens({ prefix: "mt" });
// const marginStartTokens = buildMarginTokens({ prefix: "ms" });
// const marginBottomTokens = buildMarginTokens({ prefix: "mb" });
// const marginEndTokens = buildMarginTokens({ prefix: "me" });
// const marginPropDefs = {
//     ...marginTokens,
//     ...marginXTokens,
//     ...marginYTokens,
//     ...marginTopTokens,
//     ...marginStartTokens,
//     ...marginBottomTokens,
//     ...marginEndTokens
// };
// // // Values are wrong. Should be corresponding spacing token reference. not raw values.
// // console.log("marginTokens: ", marginTokens);
// //
// module.exports = marginTokens;
// // module.exports = {
// //   'm-f-1-2': { value: '{compass.spacing.f.1/2}' },
// // // ...marginTokens
// // };
//

const coreSpacingTokens = require("./coreSpacing");
const fractionalSpacingTokens = require("./fractionalSpacing");
const { buildTokensFromScale } = require('../../buildTokenDefinition');
// const marginKeys = ["m", "mx", "my", "mt", "me", "mb", "ms"];
const marginKeys = ["m"];
//
// const extractValues = ({ obj, path = [], exclude = [] }) => {
//   let values = [];
//
//   for (const key in obj) {
//     if(exclude.includes(key)) continue;
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       values = values.concat(extractValues(obj[key], path.concat(key)));
//     } else {
//       values.push({ path: path.concat(key), value: obj[key] });
//     }
//   }
//
//   return values;
// };
//
// const generateMarginTokens = (tokens) => {
//   const marginTokens = {};
//   const values = extractValues({ tokens });
//   console.log("values: ", values);
//
//   values.forEach(({ path, value }) => {
//     marginKeys.forEach(marginKey => {
//       const tokenName = `${marginKey}-${path.join('-')}`;
//       marginTokens[tokenName] = { value };
//       marginTokens[`${tokenName}-n`] = { value: `-${value}` };
//     });
//   });
//
//   return marginTokens;
// };

// const coreSpacingMarginTokens = generateMarginTokens(coreSpacingTokens);
// console.log("coreSpacingMarginTokens: ", JSON.stringify(coreSpacingMarginTokens, null, 4));
// const fractionalSpacingMarginTokens = generateMarginTokens(fractionalSpacingTokens);

// Combine or use separately as needed
// const allMarginTokens = { ...coreSpacingMarginTokens, ...fractionalSpacingMarginTokens };
// const testScale = {compass: {spacing: {...Object.fromEntries(Object.entries(coreSpacingTokens))}}};
// console.log("coreSpacingTokens: ", JSON.stringify(coreSpacingTokens, null, 4));
//
// const testScale = Object.fromEntries(Object.entries(coreSpacingTokens.spacing).slice(0,3));
// console.log("testScale: ", JSON.stringify(testScale, null, 4));
// console.log("coreSpacingToken: ", JSON.stringify(coreSpacingTokens.spacing[1], null, 4));

// For Reference:
// valueFormatter args:  [
//     "scaleKeys",
//     "scale",
//     "prefix",
//     "exclude",
//     "value"
// ]

// const generateAliasReference = (args) => {
//   console.log("args: ", args);
//   console.log("Object.keys(args): ", Object.keys(args));
//
//   const { scale, prefix, exclude, rawValue, valueObject } = args;
//   // console.log("rawValue: ", rawValue);
//   // console.log("valueObject: ", valueObject);
//   // console.log("generateAliasReference | valueFormatter args: ", JSON.stringify({ ...args }, null, 2));
//   return rawValue;
// }
//
// const marginTokens = buildTokensFromScale({scale: testScale, prefix: "m", valueFormatter: generateAliasReference});
// console.log("marginTokens: ", JSON.stringify(marginTokens, null, 4));
// // module.exports = marginTokens;
// //
