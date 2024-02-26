import classNames from 'classnames';
import { mergeStyles } from './mergeStyles.js';
import {
  isResponsiveObject,
  getResponsiveClassNames,
  getResponsiveStyles,
} from './getResponsiveStyles.js';
import { formatString } from './formatString.js';
import isObjectWithValidation from './isObjectWithValidation.js';
// import { validatePropDefinitions } from '../../props/propDef.js';

// Utility function to apply defaults and validate enum val//TODO:  add support for other value types than enums
const parsePropValue = (value, propDef) => {
  if (!value && !!propDef.required) {
    console.error('parsePropValue | value is not defined and is required: ', value);
    return;
  }
  const isContainerDisplay = propDef.className === 'container-display';
  isContainerDisplay && console.log('parsePropValue | container-display value: ', value);

  if (propDef.type === 'enum') {
    const hasDefaultValue = propDef.default !== undefined;
    const valueIsSupported = !propDef.values || propDef.values?.includes(value);
    const propDefHasParser = 'parseValue' in propDef;

    const valueOrDefault =
      hasDefaultValue && (value === undefined || !valueIsSupported) ? propDef.default : value;
    const parsedValue = propDefHasParser ? propDef.parseValue(valueOrDefault) : valueOrDefault;

    return parsedValue;
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

export const extractProps = (props, propDefs, options = {}) => {
  const { scopedStyles = undefined } = options;
  // const propDefsAreValid = validatePropDefinitions(propDefs); //TODO: Decide if we want to validate propDefs here or validate as they are parsed.
  // Initial Guard checks
  if (!isObjectWithValidation(props)) {
    console.error('extractProps | props is not an object: ', props);
    return;
  }
  if (!propDefs && !isObjectWithValidation(propDefs)) {
    console.error('extractProps | propDefs is not defined: ', propDefs);
    return;
  }
  if (!!scopedStyles && !isObjectWithValidation(scopedStyles)) {
    console.error('extractProps | scopedStyles is not an object: ', scopedStyles);
    return;
  }

  const { processedProps, className, classProps } = Object.entries(propDefs).reduce(
    (acc, [key, propDef], index) => {
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
    },
    {
      className: '',
      classProps: {},
      processedProps: {},
    }
  );

  const { className: passedClassName, ...restProps } = Object.fromEntries(
    Object.entries(props).filter(([name]) => !Object.hasOwn(processedProps, name))
  );

  return {
    processedProps,
    className: classNames(className, passedClassName), // TODO: merge styles if necessary
    classProps,
    restProps,
  };
};
