import {
  primitiveCoreScale,
  primitiveFractionalScale,
} from '../../compass-style-dictionary/dist/primitiveScales.js';
export const coreKeys = Object.keys(primitiveCoreScale);
export const negativeCoreKeys = coreKeys
  .map((value) => `n${value}`)
  .filter((item) => item !== 'n0');
export const fractionalKeys = Object.keys(primitiveFractionalScale);
export const layoutPropertiesEnums = {
  width: [...coreKeys, 'auto', 'min-content', 'max-content'],
  height: [...coreKeys, 'auto', 'min-content', 'max-content'],
  position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
  inset: ['auto', ...fractionalKeys, ...coreKeys],
  top: ['auto', ...fractionalKeys, ...coreKeys],
  right: ['auto', ...fractionalKeys, ...coreKeys],
  bottom: ['auto', ...fractionalKeys, ...coreKeys],
  left: ['auto', ...fractionalKeys, ...coreKeys],
  shrink: ['true', 'false'],
  grow: ['true', 'false'],
  p: coreKeys,
  px: coreKeys,
  py: coreKeys,
  pt: coreKeys,
  pe: coreKeys,
  pb: coreKeys,
  ps: coreKeys,
};
export const marginPropertiesEnums = {
  m: ['auto', ...coreKeys, ...negativeCoreKeys],
  mx: ['auto', ...coreKeys, ...negativeCoreKeys],
  my: ['auto', ...coreKeys, ...negativeCoreKeys],
  mt: ['auto', ...coreKeys, ...negativeCoreKeys],
  me: ['auto', ...coreKeys, ...negativeCoreKeys],
  mb: ['auto', ...coreKeys, ...negativeCoreKeys],
  ms: ['auto', ...coreKeys, ...negativeCoreKeys],
};
export const layoutComponentEnums = {
  ...layoutPropertiesEnums,
  ...marginPropertiesEnums,
};
