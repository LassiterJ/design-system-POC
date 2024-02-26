import { fractionalKeys } from '../../../../props/layoutPropDefs.js';
import { asChildPropDef } from '../../../../props/asChildPropDef.js';

export const sizePropValueEnum = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  ...fractionalKeys,
];

const parseDisplayValue = (value) => {
  return value === 'initial' ? 'flex' : value;
};

export const containerPropDefs = {
  asChild: asChildPropDef,
  display: {
    type: 'enum',
    className: 'container-display',
    default: 'initial',
    values: ['initial', 'none'],
    parseValue: parseDisplayValue,
  },
};

export const innerPropDefs = {
  size: {
    type: 'enum',
    className: 'container-size',
    default: sizePropValueEnum[3],
    values: sizePropValueEnum, // correspond to the max-width property
  },
};
