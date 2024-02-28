import { asChildPropDef } from '../../../../props/asChildPropDef.js';

export const boxPropDefs = {
  asChild: asChildPropDef,
  display: {
    type: 'enum',
    className: 'box-display',
    customProperties: ['--box-display'],
    default: undefined,
    values: ['block', 'inline-block', 'inline', 'none'],
    responsive: true,
  },
};
