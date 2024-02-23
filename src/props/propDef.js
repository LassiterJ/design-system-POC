// Example propDef with all options:
import PropTypes from 'prop-types';
// export const propDef = {
//   type: 'enum',
//   className: 'flex-display',
//   values: ['flex', 'inline-flex', 'none'],
//   default: 'flex',
//   required: false,
//   parseValue: (value) => value,
//   responsive: true,
//   description: 'The display property for the flex container',
// };

// propTypes
export const propDefPropTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  values: PropTypes.array.isRequired,
  default: PropTypes.any,
  required: PropTypes.bool,
  parseValue: PropTypes.func, // Parse rather than validate. https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/
  responsive: PropTypes.bool,
  description: PropTypes.string,
};
//
// // Example usage
// const props = {
//   name: 'hello', // is valid
//   age: 'world', // not valid
// };
//
// // Works with standalone PropTypes
// PropTypes.checkPropTypes(propDefPropTypes, props, 'prop', 'MyComponent');

// Utility function to validate prop definitions
export const validatePropDefinition = (propDef, propDefTemplate = propDefPropTypes) => {
  //
  // Object.keys(propDefs).forEach((key) => {
  //   const propDef = propDefs[key];
  //   try {
  //     PropTypes.checkPropTypes(propDefTemplate, propDef, 'prop', `validatePropDefinitions: ${key}`);
  //   } catch (e) {
  //     console.error('validatePropDefinitions | error: ', e);
  //     return false;
  //   }
  // });
  return true;
};
