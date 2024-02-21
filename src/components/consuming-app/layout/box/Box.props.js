import { asChildPropDef } from '../../../../props/asChildPropDef.js';

export const boxPropDefs = {
  asChild: asChildPropDef,
  display: {
    type: 'enum',
    className: 'display',
    default: undefined,
    values: ['block', 'inline-block', 'inline', 'none'],
  },
};
