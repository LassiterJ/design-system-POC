import React from 'react';
import styles from './Box.module.scss';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { layoutPropDefs } from '../../../../props/layoutPropDefs.js';
import { extractProps } from '../../../../utilities/js/extractProps.js';
import { boxPropDefs } from './Box.props.js';

//  Component modeled after https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/box.tsx

export const Box = React.forwardRef((props, forwardedRef) => {
  const extractedProps = extractProps(props, {
    ...boxPropDefs,
    ...layoutPropDefs,
    ...marginPropDefs,
  });

  const { processedProps, className, classProps, style, restProps } = extractedProps;
  const { asChild, as: Tag = 'div', ...boxProps } = processedProps;
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...restProps}
      ref={forwardedRef}
      className={classNames(`${styles['box']}`, className)}
      style={style}
    />
  );
});

Box.displayName = 'Box';
export default Box;
