import {
  coreKeys,
  fractionalKeys,
  negativeCoreKeys,
  layoutPropertiesEnums,
} from '../src/props/layoutPropDefs.js';
import { marginPropertiesEnums } from '../src/props/marginPropDefs.js';
import { formatString } from '../src/utilities/js/formatString.js';
import { primitiveCoreScale } from '../src/compass-style-dictionary/dist/primitiveScales.js';
const createMappingObject = (keysArray, parseKey = (key) => key, parseValue = (key) => key) => {
  const mappingObject = {};
  keysArray.forEach((key) => {
    const formattedKey = parseKey(key);
    mappingObject[formattedKey] = parseValue(key);
    // mappingObject[key] = formatString(key, 'formatToCustomCSSProperty');
  });
  return mappingObject;
};
const fractionalScaleWithCSSPrefix = createMappingObject(fractionalKeys);
const coreScaleWithCSSPrefix = createMappingObject(coreKeys);
const negativeCoreScaleWithCSSPrefix = createMappingObject(
  negativeCoreKeys
  // (key) => `-${key}`
  // (key) => `n${key}`
);
console.log('negativeCoreScaleWithCSSPrefix: ', negativeCoreScaleWithCSSPrefix);
const keyValueMap = {
  ...coreScaleWithCSSPrefix,
  ...fractionalScaleWithCSSPrefix,
  ...negativeCoreScaleWithCSSPrefix,
};
console.log('keyValueMap: ', keyValueMap);
export const layoutArgTypes = {
  p: { control: 'select', options: layoutPropertiesEnums.p, mapping: keyValueMap },
  px: { control: 'select', options: layoutPropertiesEnums.px, mapping: keyValueMap },
  py: { control: 'select', options: layoutPropertiesEnums.py, mapping: keyValueMap },
  pt: { control: 'select', options: layoutPropertiesEnums.pt, mapping: keyValueMap },
  pe: { control: 'select', options: layoutPropertiesEnums.pe, mapping: keyValueMap },
  pb: { control: 'select', options: layoutPropertiesEnums.pb, mapping: keyValueMap },
  ps: { control: 'select', options: layoutPropertiesEnums.ps, mapping: keyValueMap },
  position: { control: 'select', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'] },
  inset: {
    control: 'select',
    options: layoutPropertiesEnums.inset,
    mapping: keyValueMap,
  },
  top: {
    control: 'select',
    options: layoutPropertiesEnums.top,
    mapping: keyValueMap,
  },
  end: {
    control: 'select',
    options: layoutPropertiesEnums.end,
    mapping: keyValueMap,
  },
  bottom: {
    control: 'select',
    options: layoutPropertiesEnums.bottom,
    mapping: keyValueMap,
  },
  start: {
    control: 'select',
    options: layoutPropertiesEnums.start,
    mapping: keyValueMap,
  },
  width: {
    control: 'select',
    options: layoutPropertiesEnums.width,
    mapping: keyValueMap,
  },
  height: {
    control: 'select',
    options: layoutPropertiesEnums.height,
    mapping: keyValueMap,
  },
  flexShrink: { control: 'select', options: layoutPropertiesEnums.flexShrink },
  flexGrow: { control: 'select', options: layoutPropertiesEnums.flexGrow },
};

export const marginArgTypes = {
  m: {
    control: 'select',
    options: marginPropertiesEnums.m,
    mapping: keyValueMap,
  },
  mx: { control: 'select', options: marginPropertiesEnums.mx, mapping: keyValueMap },
  my: { control: 'select', options: marginPropertiesEnums.my, mapping: keyValueMap },
  mt: { control: 'select', options: marginPropertiesEnums.mt, mapping: keyValueMap },
  me: { control: 'select', options: marginPropertiesEnums.me, mapping: keyValueMap },
  mb: { control: 'select', options: marginPropertiesEnums.mb, mapping: keyValueMap },
  ms: { control: 'select', options: marginPropertiesEnums.ms, mapping: keyValueMap },
};
