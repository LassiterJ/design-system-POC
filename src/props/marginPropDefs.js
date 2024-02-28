import { withBreakpoints } from '../utilities/js/breakpoints.js';
import { negativeCoreKeys, coreKeys } from './layoutPropDefs.js';
import { primitiveCoreScale } from '../compass-style-dictionary/dist/primitiveScales.js';
import { formatString } from '../utilities/js/formatString.js';

// Created based off of Radix-Theme's margin.props.ts: https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/helpers/props/margin.props.ts
// prettier-ignore

export const marginPropertiesMap = {
  m: { ...primitiveCoreScale, auto: 'auto' },
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
const parseMarginValue = (value) => {
  if (typeof value === 'string' && value.startsWith('-')) {
    const formattedValue = formatString(value, 'formatToCSSPropertyName');
    console.log('formattedValue: ', formattedValue);
    return formattedValue;
  }
  return value;
};
export const marginPropDefs = {
  m: {
    type: 'enum',
    className: 'm',
    values: marginPropertiesEnums.m,
    customProperties: ['--margin'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
  mx: {
    type: 'enum',
    className: 'mx',
    values: marginPropertiesEnums.mx,
    customProperties: ['--margin-right', '--margin-left'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
  my: {
    type: 'enum',
    className: 'my',
    values: marginPropertiesEnums.my,
    customProperties: ['--margin-top', '--margin-bottom'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
  mt: {
    type: 'enum',
    className: 'mt',
    values: marginPropertiesEnums.mt,
    customProperties: ['--margin-top'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
  me: {
    type: 'enum',
    className: 'me',
    values: marginPropertiesEnums.me,
    customProperties: ['--margin-right'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
  mb: {
    type: 'enum',
    className: 'mb',
    values: marginPropertiesEnums.mb,
    customProperties: ['--margin-bottom'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
  ms: {
    type: 'enum',
    className: 'ms',
    values: marginPropertiesEnums.ms,
    customProperties: ['--margin-left'],
    parseValue: parseMarginValue,
    default: undefined,
    responsive: true,
  },
};
