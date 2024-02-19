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

function mergePropDefs(...args) {
  return Object.assign({}, ...args);
}

export const extractProps = (props, ...propDefs) => {
  let className;
  let style;
  const extractedProps = { ...props };
  const allPropDefs = mergePropDefs(...propDefs);
  console.log('extractProps | allPropDefs: ', allPropDefs);
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
