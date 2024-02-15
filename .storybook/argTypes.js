import {
  coreKeys,
  fractionalKeys,
  negativeCoreKeys,
  layoutComponentEnums,
} from '../src/utilities/js/layoutPropDefs.js';
// const fractionalScaleWithCSSPrefix = (originalObject) => {
//   const modifiedObject = {};
//
//   for (const key in originalObject) {
//     const modifiedKey = key.replace(/\//g, '--');
//     modifiedObject[key] = modifiedKey;
//   }
//
//   return modifiedObject;
// };

// TODO: make a single utility for transforming scales and their parts.
const normalizingFunctions = {
  decimalsToHyphens: (str) => str.replace(/\./g, '-'),
  fractionsToUnderScores: (str) => str.replace(/\//g, '_'),
  negativesToN: (str) => (str.startsWith('-') ? `n${str.slice(1)}` : str),
  prefixWithDoubleHyphens: (str) => str.replace(/\//g, '--'),
};
const normalizeString = (str) => {
  console.log('normalizeString | str: ', str);
  const normalizers = Object.values(normalizingFunctions);
  const normalizedString = normalizers.reduce((acc, normalizer) => normalizer(acc), str);
  console.log('normalizedString: ', normalizedString);
  return normalizedString;
};
const createMappingObject = (keysArray) => {
  const mappingObject = {};
  keysArray.forEach((key) => {
    mappingObject[key] = normalizeString(key);
  });
  return mappingObject;
};
const fractionalScaleWithCSSPrefix = createMappingObject(fractionalKeys);
const coreScaleWithCSSPrefix = createMappingObject(coreKeys);
const keyValueMap = { ...coreScaleWithCSSPrefix, ...fractionalScaleWithCSSPrefix };
export const layoutArgTypes = {
  p: { control: 'select', options: layoutComponentEnums.p, mapping: keyValueMap },
  px: { control: 'select', options: layoutComponentEnums.px, mapping: keyValueMap },
  py: { control: 'select', options: layoutComponentEnums.py, mapping: keyValueMap },
  pt: { control: 'select', options: layoutComponentEnums.pt, mapping: keyValueMap },
  pe: { control: 'select', options: layoutComponentEnums.pe, mapping: keyValueMap },
  pb: { control: 'select', options: layoutComponentEnums.pb, mapping: keyValueMap },
  ps: { control: 'select', options: layoutComponentEnums.ps, mapping: keyValueMap },
  position: { control: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'] },
  inset: {
    control: 'select',
    options: layoutComponentEnums.inset,
    mapping: keyValueMap,
  },
  top: {
    control: 'select',
    options: layoutComponentEnums.top,
    mapping: keyValueMap,
  },
  right: {
    control: 'select',
    options: layoutComponentEnums.right,
    mapping: keyValueMap,
  },
  bottom: {
    control: 'select',
    options: layoutComponentEnums.bottom,
    mapping: keyValueMap,
  },
  left: {
    control: 'select',
    options: layoutComponentEnums.left,
    mapping: keyValueMap,
  },
  width: {
    control: 'select',
    options: layoutComponentEnums.width,
    mapping: keyValueMap,
  },
  height: {
    control: 'select',
    options: layoutComponentEnums.height,
    mapping: keyValueMap,
  },
  shrink: { control: 'select', options: layoutComponentEnums.shrink },
  grow: { control: 'select', options: layoutComponentEnums.grow },
};

export const marginArgTypes = {
  m: { control: 'select', options: layoutComponentEnums.m },
  mx: { control: 'select', options: layoutComponentEnums.mx },
  my: { control: 'select', options: layoutComponentEnums.my },
  mt: { control: 'select', options: layoutComponentEnums.mt },
  me: { control: 'select', options: layoutComponentEnums.me },
  mb: { control: 'select', options: layoutComponentEnums.mb },
  ms: { control: 'select', options: layoutComponentEnums.ms },
};
