import React from 'react';
import styles from './Flex.module.scss';
import styleUtils from './FlexUtilityClasses.module.scss';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { layoutPropDefs } from '../../../../props/layoutPropDefs.js';
import { extractProps, extractProps2 } from '../../../../utilities/js/extractProps.js';
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
  console.log('rawProps: ', props);
  const {
    // gap = flexPropDefs.gap.default,
    // display = flexPropDefs.display.default,
    // align,
    // justify,
    // wrap,
    // direction,
    // ...restProps
  } = props; // currently, extractProps removes props when they have classNames in their propdef. TODO decide if this is the desired behavior

  const extractedProps = extractProps2(
    props,
    {
      ...flexPropDefs,
      ...layoutPropDefs,
      ...marginPropDefs,
    },
    { scopedStyles: styleUtils }
  );
  // const extractedProps = extractProps(restProps, flexPropDefs, layoutPropDefs, marginPropDefs);
  console.log('Flex | extractedProps: ', extractedProps);
  const { processedProps, className, classProps, restProps } = extractedProps;
  const { asChild, as: Tag = 'div' } = processedProps;
  const Comp = asChild ? Slot : 'div';
  //
  // // Dynamic Classes
  // const gapClass = flexPropDefs.gap.values.includes(gap) ? styleUtils[`flex-gap-${gap}`] : '';
  // const displayClass = flexPropDefs.display.values.includes(display)
  //   ? styleUtils[`flex-display-${display}`]
  //   : '';
  // const directionClass = flexPropDefs.direction.values.includes(direction)
  //   ? styleUtils[`flex-direction-${direction}`]
  //   : '';
  // const alignClass = flexPropDefs.align.values.includes(align)
  //   ? styleUtils[`flex-align-${align}`]
  //   : '';
  // const justifyClass = flexPropDefs.justify.values.includes(justify)
  //   ? styleUtils[`flex-justify-${justify}`]
  //   : '';
  // const wrapClass = flexPropDefs.wrap.values.includes(wrap) ? styleUtils[`flex-wrap-${wrap}`] : '';
  return (
    <Comp
      {...restProps}
      ref={forwardedRef}
      // className={classNames(
      //   `${styles['flex']}`,
      //   gapClass,
      //   displayClass,
      //   className,
      //   directionClass,
      //   alignClass,
      //   justifyClass,
      //   wrapClass
      // )}
      className={classNames(`${styles['flex']}`, className)}
    />
  );
});

Flex.displayName = 'Flex';
export default Flex;
