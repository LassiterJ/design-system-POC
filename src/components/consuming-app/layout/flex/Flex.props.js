import { asChildPropDef } from '../../../../props/asChildPropDef.js';
import { coreKeys, layoutPropDefs } from '../../../../props/layoutPropDefs.js';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { sizePropValueEnum } from '../container/Container.props.js';

export const flexPropDefs = {
  asChild: asChildPropDef,
  display: {
    type: 'enum',
    className: 'flex-display',
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
    className: 'flex-align-items',
    default: undefined,
    values: ['start', 'center', 'end', 'baseline', 'stretch'],
  },
  justify: {
    type: 'enum',
    className: 'flex-justify-content',
    default: undefined,
    values: ['start', 'center', 'end', 'space-between'], //TODO: may add 'around' and 'evenly'
  },
  wrap: {
    type: 'enum',
    className: 'flex-wrap',
    default: 'undefined',
    values: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  gap: {
    type: 'enum',
    className: 'flex-gap',
    default: '4',
    values: coreKeys,
  },
  ...layoutPropDefs,
  ...marginPropDefs,
};
