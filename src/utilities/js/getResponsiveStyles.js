import { breakpoints } from '../../props/breakpointsPropDef.js';

export const isResponsiveObject = (obj) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj).some((key) => breakpoints.includes(key))
  );
};

export const getResponsiveStyles = ({ className, customProperties, ...args }) => {
  //
  const responsiveClassNames = getResponsiveClassNames({
    allowArbitraryValues: true,
    className,
    ...args,
  });

  const responsiveCustomProperties = getResponsiveCustomProperties({ customProperties, ...args });
  return [responsiveClassNames, responsiveCustomProperties];
};

export const getResponsiveClassNames = ({
  allowArbitraryValues,
  value,
  className,
  propValues,
  parseValue = (value) => value,
}) => {
  const classNames = [];
  console.log('getResponsiveClassNames: value: ', value);
  if (!value) {
    return undefined;
  }

  if (className === 'inset') {
    console.log(
      'getResponsiveClassNames | className === inset | classname, value, proValues: ',
      className,
      value,
      propValues
    );
  }

  if (typeof value === 'string' && propValues.includes(value)) {
    return getBaseClassName(className, value, parseValue);
  }

  if (isResponsiveObject(value)) {
    for (const bp in value) {
      const valueHasOwnProperty = Object.hasOwn(value, bp);
      // Make sure we are not iterating over keys that aren't breakpoints
      if (!valueHasOwnProperty || !breakpoints.includes(bp)) {
        continue;
      }

      const bpValue = value[bp];

      if (bpValue !== undefined) {
        if (propValues.includes(bpValue)) {
          const baseClassName = getBaseClassName(className, bpValue, parseValue);
          const bpClassName = bp === 'initial' ? baseClassName : `${bp}:${baseClassName}`;
          classNames.push(bpClassName);
        } else if (allowArbitraryValues) {
          const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
          classNames.push(bpClassName);
        }
      }
    }

    return classNames.join(' ');
  }

  if (allowArbitraryValues) {
    return className;
  }
};

const getBaseClassName = (className, value, parseValue) => {
  // console.log('getBaseClassName | className, value: ', className, value);
  const delimiter = className ? '-' : '';
  const matchedValue = parseValue(value);
  const isNegative = matchedValue?.startsWith('-');
  const minus = isNegative ? '-' : '';
  const absoluteValue = isNegative ? matchedValue?.substring(1) : matchedValue;
  return `${minus}${className}${delimiter}${absoluteValue}`;
};

export const getResponsiveCustomProperties = ({
  customProperties,
  value,
  propValues,
  parseValue = (value) => value,
}) => {
  let styles = {};

  if (!value || (typeof value === 'string' && propValues.includes(value))) {
    return undefined;
  }

  if (typeof value === 'string') {
    styles = Object.fromEntries(customProperties.map((prop) => [prop, value]));
  }

  if (isResponsiveObject(value)) {
    for (const bp in value) {
      if (!Object.hasOwn(value, bp) || !breakpoints.includes(bp)) {
        continue;
      }

      const bpValue = value[bp];

      if (propValues.includes(bpValue)) {
        continue;
      }

      for (const customProperty of customProperties) {
        const bpProperty = bp === 'initial' ? customProperty : `${customProperty}-${bp}`;

        styles[bpProperty] = bpValue;
      }
    }
  }

  for (const key in styles) {
    const styleValue = styles[key];
    if (styleValue !== undefined) {
      styles[key] = parseValue(styleValue);
    }
  }

  return styles;
};
