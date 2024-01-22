import React from 'react';
import styles from './Box.module.scss';
import classNames from 'classnames';
import {
  extractLayoutProps,
} from '../../../../utilities/layout';
import {
  extractMarginProps,
} from '../../../../utilities/margin.props';
import {
  getLayoutStyles,
} from '../../../../utilities/layout';
import {
  mergeStyles,
} from '../../../../utilities/mergeStyles';
import {
  withBreakpoints,
} from '../../../../utilities/breakpoints';
import {
  withMarginProps,
} from '../../../../utilities/margin.props';
import { Slot } from '@radix-ui/react-slot';
//  Component modeled after https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/box.tsx

const boxPropDefs = {
display: {
    default: undefined,
    values: ['block', 'inline-block', 'inline', 'none'],
  },
};

export const Box = React.forwardRef((props, forwardedRef) => {
  // Extract props
  const { rest: marginRest, ...marginProps } = extractMarginProps(props);
  const { rest: layoutRest, ...layoutProps } = extractLayoutProps(marginRest);
  const {
    className,
    asChild,
    style,
    display = boxPropDefs.display.default,
    ...boxProps
  } = layoutRest;
  const validatedDisplay = boxPropDefs.display.values.includes(display)? display : boxPropDefs.display.default;
  const [layoutClassNames, layoutCustomProperties] = getLayoutStyles(layoutProps);
  const Comp = asChild ? Slot : 'div';
  const finalBoxProps = {
    class: classNames(`${styles["compass-box"]}`),
    passedClassName: className,
    classesWithBreakpoints: withBreakpoints(validatedDisplay, 'compass-display'),// TODO: Add Window Class implementation
    withMarginProps: withMarginProps(marginProps),
    layoutClassNames,
  }
  console.log("finalBoxProps: ", finalBoxProps);
  return (
    <Comp
      {...boxProps}
      ref={forwardedRef}
      className={classNames(
        `${styles["compass-box"]}`,
        className,
        withBreakpoints(validatedDisplay, 'compass-display'), // TODO: Add Window Class implementation
        withMarginProps(marginProps),
        layoutClassNames,
      )}
      style={mergeStyles(layoutCustomProperties, style)}
    />
  );
});
Box.displayName = 'Box';
export default Box;



