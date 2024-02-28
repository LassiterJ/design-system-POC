import React from 'react';

/**
 * Facilitates correct DOM nesting for components using `asChild` with `Slot`.
 * This helper ensures that when the `asChild` prop is utilized, the resulting DOM structure
 * correctly integrates consumer-specified `children`, preserving intended order and nesting.
 * It supports both direct content or a function returning content as the second argument.
 */
export const conditionallyWrapChildren = (options, content) => {
  const { asChild, children } = options;
  if (!asChild) return typeof content === 'function' ? content(children) : content;

  const firstChild = React.Children.only(children);
  return React.cloneElement(firstChild, {
    children: typeof content === 'function' ? content(firstChild.props.children) : content,
  });
};
