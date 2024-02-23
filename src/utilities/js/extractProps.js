import classNames from 'classnames';
// import { getResponsiveClassNames, getResponsiveStyles } from './get-responsive-styles.js';
// import { isResponsiveObject } from './is-responsive-object.js';
import { mergeStyles } from './mergeStyles.js';
import {
  isResponsiveObject,
  getResponsiveClassNames,
  getResponsiveStyles,
} from './getResponsiveStyles.js';
import { formatString } from './formatString.js';
import isObjectWithValidation from './isObjectWithValidation.js';
// import { validatePropDefinitions } from '../../props/propDef.js';

function mergePropDefs(...args) {
  return Object.assign({}, ...args);
}
// TODO: Refactor extractProps. pass in styleUtil module to apply scoped classes from props. Maybe making the first arg an object with the props, styleUtil module and other options. Make much more readable and maintainable.
export const extractProps = (props, ...propDefs) => {
  // console.log('extractProps | props: ', props);
  let className;
  let style;
  const extractedProps = { ...props };
  const allPropDefs = mergePropDefs(...propDefs);
  for (const key in allPropDefs) {
    let value = extractedProps[key];
    const propDef = allPropDefs[key];

    if (typeof propDef !== 'object') {
      console.log('propDef is not an object: ', propDef);
    }

    // Apply prop def defaults
    if (propDef.default !== undefined && value === undefined) {
      value = propDef.default;
    }

    // Apply the default value if the value is not a valid enum value
    if (propDef.type === 'enum') {
      const values = [propDef.default, ...propDef.values];

      if (!values.includes(value) && !isResponsiveObject(value)) {
        value = propDef.default;
      }
    }

    // Apply the value with defaults
    extractedProps[key] = value;

    if (!!propDef?.className) {
      // ClassNames are applied without styles when using module style sheets.
      // TODO: Add support for module style sheets
      // Either use a passed`styles` object or don't delete the extractedProps[key] and return a property classProps for the consuming component to use.
      delete extractedProps[key];

      const isResponsivePropDef = 'responsive' in propDef;
      // Make sure we are not threading through responsive values for non-responsive prop defs
      if (!value || (isResponsiveObject(value) && !isResponsivePropDef)) {
        continue;
      }

      if (isResponsiveObject(value)) {
        // Apply prop def defaults to the `initial` breakpoint
        if (propDef.default !== undefined && value.initial === undefined) {
          value.initial = propDef.default;
        }

        // Apply the default value to the `initial` breakpoint when it is not a valid enum value
        if (propDef.type === 'enum') {
          const values = [propDef.default, ...propDef.values];

          if (!values.includes(value.initial)) {
            value.initial = propDef.default;
          }
        }
      }

      if (propDef.type === 'enum') {
        const formattedValue = value && formatString(value, 'formatToCustomCSSClassSyntax');
        const formattedValues = propDef.values.map((value) =>
          formatString(value, 'formatToCustomCSSClassSyntax')
        );
        const propClassName = getResponsiveClassNames({
          allowArbitraryValues: false,
          value: formattedValue,
          className: propDef.className,
          propValues: formattedValues,
          parseValue: propDef.parseValue,
        });

        className = classNames(className, propClassName);
        continue;
      }

      if (propDef.type === 'string' || propDef.type === 'enum | string') {
        const propDefValues =
          propDef.type === 'string'
            ? []
            : propDef.values.map((value) => formatString(value, 'formatToCustomCSSClassSyntax'));
        const [propClassNames, propCustomProperties] = getResponsiveStyles({
          className: propDef.className,
          customProperties: propDef.customProperties,
          propValues: propDefValues,
          parseValue: propDef.parseValue,
          value,
        });

        style = mergeStyles(style, propCustomProperties);
        className = classNames(className, propClassNames);
        continue;
      }

      if (propDef.type === 'boolean' && value) {
        className = classNames(className, propDef.className);
      }
    }
  }
  extractedProps.className = classNames(className, props.className);
  extractedProps.style = mergeStyles(style, props.style);
  return extractedProps;
};

// Utility function to apply defaults and validate enum val//TODO:  add support for other value types than enums
const parsePropValue = (value, propDef) => {
  if (!value && !!propDef.required) {
    console.error('parsePropValue | value is not defined and is required: ', value);
    return;
  }

  if (propDef.type === 'enum') {
    const hasDefaultValue = propDef.default !== undefined;
    const valueIsSupported = !propDef.values || propDef.values?.includes(value);
    const propDefHasParser = 'parseValue' in propDef;
    const parsedValue = propDefHasParser ? propDef.parseValue(value) : value;
    const valueOrDefault =
      hasDefaultValue && (parsedValue === undefined || !valueIsSupported)
        ? propDef.default
        : parsedValue;

    return valueOrDefault;
  }
  return value || propDef.default;
};

const getClassnameData = (propObj, propDef, scopedStyles) => {
  if (propDef.className === 'm') {
    console.log('getClassnameData |propObj: ', propObj);
  }
  const { name, value } = propObj;
  const { type, className, values, default: defaultValue, responsive } = propDef;
  if (!className) {
    return {};
  }
  //TODO: Even if they have scoped styles, the class might not be in the scoped styles object. Need to handle that.
  const hasScopedStyles = isObjectWithValidation(scopedStyles);

  const scopedClass = hasScopedStyles && scopedStyles[`${className}-${value}`];
  if (scopedClass) {
    return { className: scopedClass, classProp: { [name]: value } };
  }
  return { className: `${className}-${value}`, classProp: { [name]: value } };
};

const handleResponsiveValue = (valueOrDefault, propDef) => {
  // iterate through breakpoints and apply parsePropValue to each value
  // figure out implementation of responsive values
  return undefined;
};

const parseProp = (matchedPropObj, propDef, scopedStyles) => {
  if (!propDef && !isObjectWithValidation(matchedPropObj)) {
    console.error('Error neither propDef nor matchedPropObj are defined: ');
    console.trace("The above error occurred in the extractProps function's parseProp function");
    return;
  }

  if (!matchedPropObj?.value && propDef.required) {
    console.error('extractProps | matchedPropObj is not defined and is required: ', matchedPropObj);
    console.trace("The above error occurred in the extractProps function's parseProp function");
    return;
  }

  // handle className and classProp
  // if propDef.responsive && isResponsiveObject(matchedPropObj.value)
  // apply parsePropValue to each value in the responsive object then handle the parsed responsive object somehow
  const parsedValue = parsePropValue(matchedPropObj?.value, propDef);
  if (parsedValue === undefined) {
    return;
  }
  const { className = '', classProp = {} } = getClassnameData(
    { name: matchedPropObj.name, value: parsedValue },
    propDef,
    scopedStyles
  );

  // handle processedProps
  const processedProp = isObjectWithValidation(matchedPropObj)
    ? { name: matchedPropObj.name, value: parsedValue }
    : {};

  const parsedProp = {
    className,
    classProp,
    processedProp,
  };
  // if

  return parsedProp;
};

export const extractProps2 = (props, propDefs, options = {}) => {
  const { scopedStyles = undefined } = options;
  // const propDefsAreValid = validatePropDefinitions(propDefs); //TODO: Decide if we want to validate propDefs here or validate as they are parsed.
  // Initial Guard checks
  if (!isObjectWithValidation(props)) {
    console.error('extractProps2 | props is not an object: ', props);
    return;
  }
  if (!propDefs && !isObjectWithValidation(propDefs)) {
    console.error('extractProps2 | propDefs is not defined: ', propDefs);
    return;
  }
  if (!!scopedStyles && !isObjectWithValidation(scopedStyles)) {
    console.error('extractProps2 | scopedStyles is not an object: ', scopedStyles);
    return;
  }
  const parsePropsReducer = (acc, [key, propDef], index) => {
    const propValue = props[key];
    const parsedProp = parseProp({ name: key, value: propValue }, propDef, scopedStyles);
    if (!parsedProp) {
      return acc;
    }
    const { className, classProp, processedProp } = parsedProp;
    const newAcc = {
      className: classNames(acc.className, className),
      classProps: { ...acc.classProps, ...classProp },
      processedProps: { ...acc.processedProps, [processedProp.name]: processedProp.value },
    };

    return newAcc;
  };

  const { processedProps, className, classProps } = Object.entries(propDefs).reduce(
    parsePropsReducer,
    {
      className: '',
      classProps: {},
      processedProps: {},
    }
  );

  const restProps = Object.fromEntries(
    Object.entries(props).filter(([name]) => !Object.hasOwn(processedProps, name))
  );

  return { processedProps, className, classProps, restProps };
};
