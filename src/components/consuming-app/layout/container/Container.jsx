import React from 'react';
import scopedStyleUtils from './ContainerUtilityClasses.module.css';
import styles from './Container.module.scss';
import classNames from 'classnames';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../../../utilities/js/extractProps.js';
import { layoutPropDefs, widthPropDefs, heightPropDefs } from '../../../../props/layoutPropDefs.js';
import { containerPropDefs, innerPropDefs, sizePropValueEnum } from './Container.props.js';
import isObjectWithValidation from '../../../../utilities/js/isObjectWithValidation.js';
import { conditionallyWrapChildren } from '../../../../utilities/js/conditionallyWrapChildren.js';
//  Component modeled after https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/container.tsx

export const Container = React.forwardRef((props, forwardedRef) => {
  const { width = 'full', minWidth, maxWidth, size = '4', ...restRawProps } = props;
  const extractedProps = extractProps(
    { flexGrow: 'true', ...restRawProps },
    {
      ...containerPropDefs,
      ...layoutPropDefs,
      ...marginPropDefs,
    },
    { scopedStyles: scopedStyleUtils }
  );

  const innerExtractedProps = extractProps(
    { width, size }, // TODO: should we include maxWidth or minWidth? Size sets maxWidth but not minWidth. I wonder if we should just include max and min widths instead of the size prop.
    {
      ...widthPropDefs,
      ...heightPropDefs,
      ...innerPropDefs,
    },
    { scopedStyles: scopedStyleUtils }
  );

  const { processedProps, className, style, restProps: restRootProps } = extractedProps;
  const { className: innerClassName, restProps: restInnerProps } = innerExtractedProps;
  const { asChild, as: Tag = 'div' } = processedProps;
  const { children } = restRootProps;
  const Comp = asChild ? Slot : Tag; //TODO: not sure about allowing the 'as' prop yet.

  return (
    <Comp
      {...restRootProps}
      ref={forwardedRef}
      className={classNames(`${styles['container']}`, className)}
      style={style}
    >
      {conditionallyWrapChildren({ asChild, children }, (children) => (
        <div {...restInnerProps} className={classNames(styles['container-inner'], innerClassName)}>
          {children}
        </div>
      ))}
    </Comp>
  );
});

Container.displayName = 'Container';
export default Container;
