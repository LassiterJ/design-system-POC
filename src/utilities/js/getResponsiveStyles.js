import { breakpoints } from '../../props/breakpointsPropDef.js';

export const isResponsiveObject = (obj) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj).some((key) => breakpoints.includes(key))
  );
};

export const getResponsiveStyles = ({
  className,
  customProperties,
  value,
  propValueEnum,
  ...args
}) => {
  //
  const responsiveClassNames = getResponsiveClassNames({
    allowArbitraryValues: false,
    className,
    customProperties,
    value,
    propValueEnum,
    ...args,
  });

  const responsiveCustomProperties = getResponsiveCustomProperties({
    customProperties,
    value,
    propValueEnum,
    ...args,
  });
  return { responsiveClassNames, responsiveCustomProperties };
};

export const getResponsiveClassNames = ({
  allowArbitraryValues,
  value,
  className,
  propValueEnum,
  parseValue = (value) => value,
}) => {
  const classNames = [];
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string' && propValueEnum.includes(value)) {
    return getBaseClassName(className, value, parseValue);
  }

  if (isResponsiveObject(value)) {
    for (const bp in value) {
      console.log('bp: ', bp);
      const valueHasOwnProperty = Object.hasOwn(value, bp);
      // Make sure we are not iterating over keys that aren't breakpoints
      if (!valueHasOwnProperty || !breakpoints.includes(bp)) {
        continue;
      }
      const bpValue = value[bp];
      console.log('bpValue: ', bpValue);
      console.log('className: ', className);
      if (bpValue !== undefined) {
        if (propValueEnum.includes(bpValue)) {
          const baseClassName = getBaseClassName(className, bpValue, parseValue);
          console.log('baseClassName: ', baseClassName);
          const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
          classNames.push(bpClassName);
        }
        // else if (allowArbitraryValues) {
        //   const bpClassName = bp === 'initial' ? className : `${bp}:${className}`;
        //   classNames.push(bpClassName);
        // }
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
  propValueEnum,
  parseValue = (value) => value,
}) => {
  let styles = {};

  console.log('value: ', value);
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return;
  }
  for (const breakpoint in value) {
    if (!Object.hasOwn(value, breakpoint) || !breakpoints.includes(breakpoint)) {
      continue;
    }

    const breakpointValue = value[breakpoint];
    console.log('breakpointValue: ', breakpointValue);

    // if (propValueEnum.includes(breakpointValue)) {
    //   console.log('continue??');
    //   continue; // why continue?
    // }

    for (const customProperty of customProperties) {
      const bpProperty =
        breakpoint === 'initial' ? customProperty : `${customProperty}-${breakpoint}`;

      const parsedValue = parseValue(breakpointValue);
      const formattedValue = `var(--spacing-core-${parsedValue})`; //TODO: figure out better way. I just want it to work for now.
      const removeQuotes = (str) => str.replace(/['"]+/g, '');
      styles[bpProperty] = removeQuotes(formattedValue); //remove quotes from string
    }
  }

  // for (const key in styles) {
  //   const styleValue = styles[key];
  //   if (styleValue !== undefined) {
  //     styles[key] = parseValue(styleValue);
  //   }
  // }

  return styles;
};
