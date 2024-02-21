import { asChildPropDef } from '../../../../props/asChildPropDef.js';
import { coreKeys, layoutPropDefs } from '../../../../props/layoutPropDefs.js';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';

export const flexPropDefs = {
  asChild: asChildPropDef,
  display: {
    type: 'enum',
    className: 'display',
    default: 'flex',
    values: ['flex', 'inline-flex', 'none'],
  },
  direction: {
    type: 'enum',
    className: 'flex-direction',
    values: ['row', 'column', 'row-reverse', 'column-reverse'],
  },
  align: {
    type: 'enum',
    className: 'align-items',
    default: undefined,
    values: ['start', 'center', 'end', 'baseline', 'stretch'],
  },
  justify: {
    type: 'enum',
    className: 'justify-content',
    default: undefined,
    values: ['start', 'center', 'end', 'between'], //TODO: may add 'around' and 'evenly'
  },
  wrap: {
    type: 'enum',
    className: 'flex-wrap',
    default: 'undefined',
    values: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  gap: {
    type: 'enum',
    className: 'gap',
    default: undefined,
    values: coreKeys,
  },
  ...layoutPropDefs,
  ...marginPropDefs,
};
