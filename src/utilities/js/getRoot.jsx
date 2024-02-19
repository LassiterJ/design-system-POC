import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export const getRoot = ({ asChild, children, parent: Parent }) => {
  if (asChild) {
    let child = React.Children.only(children);
    const grandChildren = child.props.children;
    return {
      Root: (props) => {
        child = React.cloneElement(child, {
          children: props.children,
        });

        // Make sure we don't pass `asChild` to DOM elements
        if (Parent === Slot) {
          return <Parent {...props}>{child}</Parent>;
        }

        return (
          <Parent asChild={asChild} {...props}>
            {child}
          </Parent>
        );
      },
      children: grandChildren,
    };
  }

  return {
    Root: Parent,
    children: children,
  };
};
