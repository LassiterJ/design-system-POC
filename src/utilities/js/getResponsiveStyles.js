import { breakpoints } from '../../props/breakpointsPropDef.js';
import { formatString } from './formatString.js';

export const isResponsiveObject = (obj) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Object.keys(obj).some((key) => breakpoints.includes(key))
  );
};

export const getResponsiveStyles = ({ propDef, prop }) => {
  const responsiveClassNames = getResponsiveClassNames({
    allowArbitraryValues: false,
    prop,
    propDef,
  });

  const responsiveCustomProperties = getResponsiveCustomProperties({
    prop,
    propDef,
  });
  return { responsiveClassNames, responsiveCustomProperties };
};

export const getResponsiveClassNames = ({ allowArbitraryValues, prop, propDef }) => {
  const { name, value } = prop;
  const {
    customProperties,
    className,
    values: propValueEnum,
    parseValue = (value) => value,
  } = propDef;

  const classNames = [];
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string' && propValueEnum.includes(value)) {
    return getBaseClassName(className, value, parseValue);
  }

  if (isResponsiveObject(value)) {
    for (const bp in value) {
      // console.log('bp: ', bp);
      const valueHasOwnProperty = Object.hasOwn(value, bp);
      // Make sure we are not iterating over keys that aren't breakpoints
      if (!valueHasOwnProperty || !breakpoints.includes(bp)) {
        continue;
      }
      const bpValue = value[bp];
      // console.log('bpValue: ', bpValue);
      // console.log('className: ', className);
      if (bpValue !== undefined) {
        if (propValueEnum.includes(bpValue)) {
          const baseClassName = getBaseClassName(className, bpValue, parseValue);
          // console.log('baseClassName: ', baseClassName);
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

// const matchValue = (prop, propDef) => {
//   // check if value  is one of the spacing core values,
//   // check if value is fractional and is one of the spacing fractional values,
//   // check if value is a custom utility class
// };
export const getResponsiveCustomProperties = ({ prop, propDef }) => {
  const { value } = prop;
  const { customProperties, parseValue = (value) => value } = propDef;

  // const matchingToken = matchValue(prop, propDef);
  let styles = {};

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return;
  }
  for (const breakpoint in value) {
    if (!Object.hasOwn(value, breakpoint) || !breakpoints.includes(breakpoint)) {
      continue;
    }

    const breakpointValue = value[breakpoint];
    // console.log('breakpointValue: ', breakpointValue);

    // if (propValueEnum.includes(breakpointValue)) {
    //   console.log('continue??');
    //   continue; // why continue?
    // }

    for (const customProperty of customProperties) {
      const bpProperty =
        breakpoint === 'initial' ? customProperty : `${customProperty}-${breakpoint}`;

      const parsedValue = parseValue(breakpointValue);
      const isFraction =
        parsedValue.includes('/') || breakpointValue.includes('/') || parsedValue === 'full';
      const isSpecial = parsedValue === 'auto';
      const isBoolean = parsedValue === 'true' || parsedValue === 'false';
      // const getValueType = () => {
      //   if(breakpointValue)
      // };
      let spacingScale = 'spacing-core';
      if (isFraction) {
        spacingScale = 'spacing-fractional';
      }
      if (isSpecial) {
        spacingScale = 'spacing-special';
      }
      if (isBoolean) {
        spacingScale = 'boolean';
      }
      const formattedString = formatString(parsedValue, 'formatToCustomCSSClassSyntax');
      // console.log('formattedString: ', formattedString);
      const formattedValue = `var(--${spacingScale}-${formattedString})`; //TODO: figure out better way. I just want it to work for now.
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
