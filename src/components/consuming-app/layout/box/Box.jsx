import React from 'react';
import styles from './Box.module.scss';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { layoutPropDefs } from '../../../../props/layoutPropDefs.js';
import { extractProps } from '../../../../utilities/js/extractProps.js';
import { asChildPropDef } from '../../../../props/asChildPropDef.js';

//  Component modeled after https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/box.tsx
const boxPropDefs = {
  asChild: asChildPropDef,
  display: {
    type: 'enum',
    className: 'display',
    default: undefined,
    values: ['block', 'inline-block', 'inline', 'none'],
  },
};

export const Box = React.forwardRef((props, forwardedRef) => {
  const extractedProps = extractProps(props, boxPropDefs, layoutPropDefs, marginPropDefs);
  console.log('extractedProps: ', extractedProps);
  const { className, asChild, as: Tag = 'div', ...boxProps } = extractedProps;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp {...boxProps} ref={forwardedRef} className={classNames(`${styles['box']}`, className)} />
  );
});

Box.displayName = 'Box';
export default Box;
