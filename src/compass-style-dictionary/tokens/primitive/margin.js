// // const {coreSpacingScale, fractionalSpacingScale, coreSpacingTokens, fractionalSpacingTokens} = require('./coreSpacing.js');
const {coreSpacingScale, fractionalSpacingScale} = require('./scales.js');
const { buildToken, buildTokensFromScale } = require( '../../buildTokenDefinition.js');
//
// console.log("coreSpacingTokens: ", coreSpacingTokens);
// // exports marginTokens that look like:
// // {
// //  "m-0": {value: {compass.spacing.0.value}},
//
// // Need to find way to map references to other tokens.
const buildMarginTokens = ({ prefix }) => {
  // const coreSpacingTokens = buildTokensFromScale({
  //   scale: coreSpacingScale,
  //   keyFormatter: (key) => key.replace(".", "_"),
  //   valueFormatter: (value) => `${value},
  //   prefix: prefix
  // });

  const fractionalSpacingTokens = buildTokensFromScale({
    scale: fractionalSpacingScale,
    keyFormatter: (key) => key.replace("/", "--"),
    prefix: prefix
  });
  // const negativeCoreSpacingTokens = buildTokensFromScale({
  //   scale: coreSpacingScale,
  //   keyFormatter: (key) => key.replace(".", "_"),
  //   valueFormatter: (value) => `-${value}`,
  //   prefix: `-${prefix}`,
  //   exclude: ["0"]
  // });
  const negativeFractionalSpacingTokens = buildTokensFromScale({
    scale: fractionalSpacingScale,
    // keyFormatter: (key) => key.replace("/", "--"),
    valueFormatter: (value) => `{spacing-f-${value}}`,
    prefix: `-${prefix}`
  });
  // const autoToken = buildToken({ key: "auto", value: "auto", prefix: "spacing" });

  return {
    // ...coreSpacingTokens,
    ...fractionalSpacingTokens,
    // ...negativeCoreSpacingTokens,
    ...negativeFractionalSpacingTokens,
    // ...autoToken
  }
};
const marginTokens = buildMarginTokens({ prefix: "m" });
const marginXTokens = buildMarginTokens({ prefix: "mx" });
const marginYTokens = buildMarginTokens({ prefix: "my" });
const marginTopTokens = buildMarginTokens({ prefix: "mt" });
const marginStartTokens = buildMarginTokens({ prefix: "ms" });
const marginBottomTokens = buildMarginTokens({ prefix: "mb" });
const marginEndTokens = buildMarginTokens({ prefix: "me" });
const marginPropDefs = {
    ...marginTokens,
    ...marginXTokens,
    ...marginYTokens,
    ...marginTopTokens,
    ...marginStartTokens,
    ...marginBottomTokens,
    ...marginEndTokens
};
// // Values are wrong. Should be corresponding spacing token reference. not raw values.
// console.log("marginTokens: ", marginTokens);
//

// module.exports = {
//   'm-f-1-2': { value: '{compass.spacing.f.1.2}' },
// // ...marginTokens
// };
//
