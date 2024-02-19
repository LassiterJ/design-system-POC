import {
  primitiveCoreScale,
  primitiveFractionalScale,
} from '../compass-style-dictionary/dist/primitiveScales.js';
export const coreKeys = Object.keys(primitiveCoreScale);
export const negativeCoreKeys = coreKeys
  .map((value) => `n${value}`)
  .filter((item) => item !== 'n0');
export const fractionalKeys = Object.keys(primitiveFractionalScale);
export const layoutPropertiesEnums = {
  width: [...coreKeys, 'auto', 'min-content', 'max-content', 'full'],
  height: [...coreKeys, 'auto', 'min-content', 'max-content'],
  position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
  inset: ['auto', ...fractionalKeys, ...coreKeys],
  top: ['auto', ...fractionalKeys, ...coreKeys],
  end: ['auto', ...fractionalKeys, ...coreKeys],
  bottom: ['auto', ...fractionalKeys, ...coreKeys],
  start: ['auto', ...fractionalKeys, ...coreKeys],
  flexShrink: ['true', 'false'],
  flexGrow: ['true', 'false'],
  p: coreKeys,
  px: coreKeys,
  py: coreKeys,
  pt: coreKeys,
  pe: coreKeys,
  pb: coreKeys,
  ps: coreKeys,
  // gridColumn: ['auto', 'span', 'start', 'end'],
  // gridColumnStart: ['auto', 'span', 'start', 'end'],
  // gridColumnEnd: ['auto', 'span', 'start', 'end'],
  // gridRow: ['auto', 'span', 'start', 'end'],
  // gridRowStart: ['auto', 'span', 'start', 'end'],
  // gridRowEnd: ['auto', 'span', 'start', 'end'],
};
export const widthPropDefs = {
  width: {
    type: 'enum',
    className: 'width',
    values: layoutPropertiesEnums.width,
    default: undefined,
    responsive: true,
  },
};

export const heightPropDefs = {
  height: {
    type: 'enum',
    className: 'height',
    values: layoutPropertiesEnums.height,
    default: undefined,
    responsive: true,
  },
};

export const paddingPropDefs = {
  p: {
    type: 'enum',
    className: 'p',
    values: layoutPropertiesEnums.p,
    default: undefined,
    responsive: true,
  },
  px: {
    type: 'enum',
    className: 'px',
    values: layoutPropertiesEnums.px,
    default: undefined,
    responsive: true,
  },
  py: {
    type: 'enum',
    className: 'py',
    values: layoutPropertiesEnums.py,
    default: undefined,
    responsive: true,
  },
  pt: {
    type: 'enum',
    className: 'pt',
    values: layoutPropertiesEnums.pt,
    default: undefined,
    responsive: true,
  },
  pe: {
    type: 'enum',
    className: 'pe',
    values: layoutPropertiesEnums.pe,
    default: undefined,
    responsive: true,
  },
  pb: {
    type: 'enum',
    className: 'pb',
    values: layoutPropertiesEnums.pb,
    default: undefined,
    responsive: true,
  },
  ps: {
    type: 'enum',
    className: 'ps',
    values: layoutPropertiesEnums.ps,
    default: undefined,
    responsive: true,
  },
};
export const layoutPropDefs = {
  ...paddingPropDefs,
  ...widthPropDefs,
  ...heightPropDefs,
  position: {
    type: 'enum',
    className: 'position',
    values: layoutPropertiesEnums.position,
    default: undefined,
    responsive: true,
  },
  inset: {
    type: 'enum',
    className: 'inset',
    values: layoutPropertiesEnums.inset,
    default: undefined,
    responsive: true,
  },
  top: {
    type: 'enum',
    className: 'top',
    values: layoutPropertiesEnums.top,
    default: undefined,
    responsive: true,
  },
  end: {
    type: 'enum',
    className: 'end',
    values: layoutPropertiesEnums.end,
    default: undefined,
    responsive: true,
  },
  bottom: {
    type: 'enum',
    className: 'bottom',
    values: layoutPropertiesEnums.bottom,
    default: undefined,
    responsive: true,
  },
  start: {
    type: 'enum',
    className: 'start',
    values: layoutPropertiesEnums.start,
    default: undefined,
    responsive: true,
  },
  flexShrink: {
    type: 'enum',
    className: 'flex-shrink',
    values: layoutPropertiesEnums.flexShrink,
    // customProperties: []
    default: undefined,
    responsive: true,
  },
  flexGrow: {
    type: 'enum',
    className: 'flex-grow',
    values: layoutPropertiesEnums.flexGrow,
    default: undefined,
    responsive: true,
  },
  // gridColumn: { type: 'string', default: undefined, responsive: true },
  // gridColumnStart: { type: 'string', default: undefined, responsive: true },
  // gridColumnEnd: { type: 'string', default: undefined, responsive: true },
  // gridRow: { type: 'string', default: undefined, responsive: true },
  // gridRowStart: { type: 'string', default: undefined, responsive: true },
  // gridRowEnd: { type: 'string', default: undefined, responsive: true },
};
console.log('layoutPropDefs: ', layoutPropDefs);
