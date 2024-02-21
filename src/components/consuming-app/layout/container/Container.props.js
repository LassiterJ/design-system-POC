import { fractionalKeys } from '../../../../props/layoutPropDefs.js';

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

export const containerPropDefs = {
  display: {
    type: 'enum',
    className: 'display',
    default: undefined,
    values: ['block', 'none'],
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
