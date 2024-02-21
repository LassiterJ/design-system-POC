import React from 'react';
import './ContainerUtilities.module.css';
import styles from './Container.module.css';
import classNames from 'classnames';
import { marginPropDefs } from '../../../../props/marginPropDefs.js';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../../../utilities/js/extractProps.js';
import { layoutPropDefs, widthPropDefs, heightPropDefs } from '../../../../props/layoutPropDefs.js';
import { getRoot } from '../../../../utilities/js/getRoot.jsx';
import { containerPropDefs, innerPropDefs, sizePropValueEnum } from './Container.props.js';
//  Component modeled after https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/container.tsx

export const Container = React.forwardRef((props, forwardedRef) => {
  const { width = 'full', minWidth, maxWidth, size = '4', ...restProps } = props;
  console.log('props', props);
  const {
    asChild,
    children: childrenProp,
    className,
    ...containerProps
  } = extractProps(restProps, containerPropDefs, layoutPropDefs, marginPropDefs);
  console.log('containerProps', containerProps);

  const { className: innerClassName, style: innerStyle } = extractProps(
    { width, minWidth, maxWidth, size },
    widthPropDefs,
    heightPropDefs,
    innerPropDefs
  );

  const { Root: ContainerRoot, children } = getRoot({
    asChild,
    children: childrenProp,
    parent: asChild ? Slot : 'div',
  });

  const sizeClass = sizePropValueEnum.includes(size) ? styles[`container-size-${size}`] : '';
  return (
    <ContainerRoot
      {...containerProps}
      ref={forwardedRef}
      className={classNames(`${styles['container']}`, className)}
    >
      <div
        className={classNames(styles['container-inner'], innerClassName, sizeClass)}
        style={innerStyle}
      >
        {children}
      </div>
    </ContainerRoot>
  );
});
Container.displayName = 'Container';
export default Container;
