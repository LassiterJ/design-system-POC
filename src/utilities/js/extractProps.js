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

const handleResponsiveValue = (prop, propDef) => {
  // iterate through breakpoints and apply parsePropValue to each value
  console.log('handleResponsiveValue: prop', prop);
  const { value } = prop;
  const { customProperties, className, values: propValueEnum, ...restPropDef } = propDef;

  const responsiveStyles = getResponsiveStyles({
    className,
    customProperties,
    value,
    propValueEnum,
    ...restPropDef,
  });
  console.log('handleResponsiveValue | responsiveStyles: ', responsiveStyles);
  return responsiveStyles;
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
  matchedPropObj.name === 'width' &&
    console.log("matchedPropObj.name === 'width': ", matchedPropObj.name) &&
    console.log('propDef: ', propDef);
  const isResponsiveObj =
    typeof matchedPropObj.value === 'object' && isResponsiveObject(matchedPropObj.value);
  const canHaveResponsiveValues = propDef.responsive;

  if (isResponsiveObj && !canHaveResponsiveValues) {
    console.error(
      'extractProps | matchedPropObj is a responsive object but propDef.responsive is not defined: ',
      matchedPropObj
    );
    console.trace("The above error occurred in the extractProps function's parseProp function");
  }

  let className = '';
  let classProp = {};
  let processedProp = {};
  let styles = {};

  if (isResponsiveObj && canHaveResponsiveValues) {
    const { responsiveClassNames, responsiveCustomProperties } = handleResponsiveValue(
      matchedPropObj,
      propDef
    );
    console.group('parseProp | isResponsiveObj && canHaveResponsiveValues');
    console.log('responsiveClasses: ', responsiveClassNames);
    console.log('responsiveCustomProperties: ', responsiveCustomProperties);
    console.log('existing className: ', className);
    console.log('existing classProp: ', classProp);
    console.log('existing processedProp: ', processedProp);
    console.log('existing styles: ', styles);
    console.log('matchedPropObj: ', matchedPropObj);
    console.groupEnd();
    className = classNames(className, responsiveClassNames);
    classProp = { [matchedPropObj.name]: matchedPropObj.value };
    processedProp = { [matchedPropObj.name]: matchedPropObj.value };
    styles = responsiveCustomProperties;
  }

  if (!isResponsiveObj) {
    // handle className and classProp
    // if propDef.responsive && isResponsiveObj(matchedPropObj.value)
    // apply parsePropValue to each value in the responsive object then handle the parsed responsive object somehow
    const parsedValue = parsePropValue(matchedPropObj?.value, propDef);
    if (parsedValue === undefined) {
      return;
    }

    const { className: nonResponsiveClassName, classProp: nonResponsiveClassProp = {} } =
      getClassnameData({ name: matchedPropObj.name, value: parsedValue }, propDef, scopedStyles);
    className = nonResponsiveClassName;
    classProp = nonResponsiveClassProp;
    processedProp = isObjectWithValidation(matchedPropObj)
      ? { [matchedPropObj.name]: parsedValue }
      : {};
  }

  // handle processedProps

  const parsedProp = {
    className,
    classProp,
    styles,
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

  const { processedProps, className, classProps, styles } = Object.entries(propDefs).reduce(
    (acc, [key, propDef], index) => {
      const propValue = props[key];
      if (typeof propValue === 'object') {
        console.log('extractProps | propValue is object: ', propValue);
      }
      const parsedProp = parseProp({ name: key, value: propValue }, propDef, scopedStyles);
      if (!parsedProp) {
        return acc;
      }
      // console.log('parsedProp: ', parsedProp);
      const { className, classProp, processedProp, styles } = parsedProp;
      return {
        className: classNames(acc.className, className),
        classProps: { ...acc.classProps, ...classProp },
        processedProps: { ...acc.processedProps, ...processedProp },
        styles: mergeStyles(acc.styles, styles),
      };
    },
    {
      className: '',
      classProps: {},
      processedProps: {},
      styles: {},
    }
  );

  const {
    className: passedClassName,
    style,
    ...restProps
  } = Object.fromEntries(
    Object.entries(props).filter(([name]) => !Object.hasOwn(processedProps, name))
  );

  return {
    processedProps,
    className: classNames(className, passedClassName), // TODO: merge styles if necessary
    style: mergeStyles(style, styles),
    classProps,
    restProps,
  };
};
