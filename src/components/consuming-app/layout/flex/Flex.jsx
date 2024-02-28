import React from 'react';
import styles from './Flex.module.scss';
import styleUtils from './FlexUtilityClasses.module.scss';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { layoutPropDefs } from '../../../../props/layoutPropDefs.js';
import { extractProps } from '../../../../utilities/js/extractProps.js';
import { flexPropDefs } from './Flex.props.js';

//  Component modeled after https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/flex.tsx
/*
asChild boolean false
display Responsive<"none" | "inline-flex" | "flex"> "flex"
direction Responsive<"row" | "column" | "row-reverse" | "column-reverse"> No default value
align Responsive<"start" | "center" | "end" | "baseline" | "stretch"> No default value
justify Responsive<"start" | "center" | "end" | "between"> "start"
wrap Responsive<"nowrap" | "wrap" | "wrap-reverse"> No default value
gap enum
*/

export const Flex = React.forwardRef((props, forwardedRef) => {
  const extractedProps = extractProps(
    props,
    {
      ...flexPropDefs,
      ...layoutPropDefs,
      ...marginPropDefs,
    },
    { scopedStyles: styleUtils }
  );

  const { processedProps, className, classProps, style, restProps } = extractedProps;
  const { asChild, as: Tag = 'div' } = processedProps;
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      {...restProps}
      ref={forwardedRef}
      className={classNames(`${styles['flex']}`, className)}
      style={style}
    />
  );
});

Flex.displayName = 'Flex';
export default Flex;
