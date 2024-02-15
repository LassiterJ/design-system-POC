/**
 * `isObjectWithValidation` Function Overview:
 * - Validates if a given value is an object based on various configurable criteria.
 * - Performs a basic type check and then applies conditional checks based on options.
 * - Supports checking for arrays, custom constructors, null prototype, and emptiness.
 * - Allows for custom validation functions.
 * - Can return a boolean result or a verbose object detailing the validation results.
 *
 *  All config options:
 * @memberof Utilities
 * @kind utility function
 * @param {Object} value: object - The object to validate.
 * @param {Boolean} [options.allowArrays=false]: Whether to allow arrays as valid objects. Default is false.
 * @param {Boolean} [options.allowEmpty=false]:  Whether to allow empty objects as valid. Default is false.
 * @param {Boolean} [options.allowCustomConstructors=false]:  Whether to allow custom constructor objects as valid. Default is true.
 * @param {Boolean} [options.allowNullPrototype=false]:  Whether to allow objects with null prototype as valid. Default is false.
 * @param {Boolean} [options.includeInheritedProps=false]:  Whether to include inherited properties in the empty check. Default is false.
 * @param {Boolean} [options.includeSymbolProps=true]:  Whether to include symbol properties in the empty check. Default is true.
 * @param {Array} [options.customValidations]: An array of custom validation functions to run on the object. Default is an empty array.
 * @param {Boolean} [options.verbose]:  Whether to return a verbose object detailing the validation results. Default is false.
 */
// TODO: implement documentation for this project

// |                                 |
// | Example Usage at bottom of file |
// V                                 V


// Directions:
// Ways to run the code:
// 1. Copy the entire code snippet and paste it into the browser console.
// 2. Run this file with `node isObjectWithValidation.js` in the terminal.

// Copying the entire code snippet and pasting it into the browser console will run the code and output the following:



const isObjectWithValidation = (value, options = {}) => {
  const {
    allowArrays = false,
    allowEmpty = false,
    allowCustomConstructors = true,
    allowNullPrototype = false,
    includeInheritedProps = false,
    includeSymbolProps = true,
    customValidations = [],
    verbose = false,
  } = options;
  
  // Initial type check
  if (typeof value !== 'object' || value === null) {
    return verbose ? { isBasicObject: false } : false;
  }
  
  // Preparing verbose results and specific condition checks
  const isBasicObject = true;
  const isArray = Array.isArray(value);
  const isCustomConstructor = value.constructor && value.constructor !== Object;
  const isNullPrototype = Object.getPrototypeOf(value) === null;
  
  const failsArrayCheck = !allowArrays && isArray;
  const failsCustomConstructorCheck = !allowCustomConstructors && isCustomConstructor;
  const failsNullPrototypeCheck = !allowNullPrototype && isNullPrototype;
  
  const results = verbose ? { isBasicObject, isArray, isCustomConstructor, isNullPrototype } : {};
  
  // Early exit for array, custom constructor, and null prototype checks
  if (failsArrayCheck || failsCustomConstructorCheck || failsNullPrototypeCheck) {
    return verbose ? { ...results, isValidObject: false } : false;
  }
  
  // Empty check considering own, inherited, and symbol properties
  if (allowEmpty) {
    const ownProps = Object.getOwnPropertyNames(value);
    const symbolProps = includeSymbolProps ? Object.getOwnPropertySymbols(value) : [];
    const inheritedProps = includeInheritedProps ? Object.keys(value) : [];
    const isEmpty = ownProps.length === 0 && symbolProps.length === 0 && inheritedProps.length === 0;
    
    if (verbose) {
      results.isEmpty = isEmpty;
    } else if (!isEmpty) {
      return false;
    }
  }
  
  // Processing custom validations
  const passesCustomValidations = customValidations.every(validate => validate(value));
  if (verbose) {
    results.passesCustomValidations = passesCustomValidations;
  } else if (!passesCustomValidations) {
    return false;
  }
  
  // Final validation result
  const isValidObject = verbose ? results.passesCustomValidations : true;
  return verbose ? { ...results, isValidObject } : isValidObject;
};

// Example Usage
// const customValidator = obj => typeof obj.someProperty !== 'undefined';
// const result = isObjectWithValidation({ someProperty: 123 }, {
//   allowArrays: false,
//   customValidations: [customValidator],
//   verbose: true
// });
//
// console.log(result);

// benchmarking:
// Assuming isObjectWithValidation function is defined above

// Helper classes and functions (define MyClass and createComplexObject as needed)
class MyClass {}

function createComplexObject(depth, breadth) {
  const obj = {};
  for (let i = 0; i < breadth; i++) {
    obj[`key${i}`] = depth > 0 ? createComplexObject(depth - 1, breadth) : `value${i}`;
  }
  return obj;
}

// Test cases
const testCases = [
  // Basic types
  { value: null, options: {} },
  { value: undefined, options: {} },
  { value: 123, options: {} },
  { value: "string", options: {} },
  { value: true, options: {} },
  { value: Symbol("sym"), options: {} },
  { value: function() {}, options: {} },
  
  // Arrays and array-like objects
  { value: [], options: {} },
  { value: [1, 2, 3], options: { allowArrays: true } },
  { value: new Array(1000).fill(0), options: { allowArrays: true } },
  
  // Objects
  { value: {}, options: {} },
  { value: { key: "value" }, options: {} },
  { value: createComplexObject(2, 5), options: {} },
  { value: new Object(), options: {} },
  
  // Custom constructor objects
  { value: new Date(), options: { allowCustomConstructors: true } },
  { value: new MyClass(), options: { allowCustomConstructors: true } },
  { value: () => {{key: "value"}}, options: { allowCustomConstructors: true } },
  { value: () => {{key: "value"}}, options: { allowCustomConstructors: false } },
  
  // Objects with special characteristics
  { value: Object.create(null), options: { allowNullPrototype: true } },
  { value: Object.freeze({}), options: {} },
  
  // Objects to check for emptiness
  { value: {}, options: { checkEmpty: true } },
  { value: { key: "value" }, options: { checkEmpty: true } },
  { value: Object.create({ inherited: true }), options: { checkEmpty: true, includeInheritedProps: true } },
  
  // Custom validation scenarios
  { value: { a: 1, b: 2 }, options: { customValidations: [obj => 'a' in obj] } },
  { value: { a: 1 }, options: { customValidations: [obj => 'b' in obj] } },
  
  // Verbose output tests
  { value: [1, 2, 3], options: { allowArrays: false, verbose: true } },
  { value: new MyClass(), options: { allowCustomConstructors: false, verbose: true } },
  
  // More complex objects
  { value: createComplexObject(4, 10), options: { checkEmpty: true } },
  // ...additional complex or edge cases as needed
];


// Function to benchmark a single test case
function benchmarkTestCase(testCase, index) {
  const start = performance.now();
  const result = isObjectWithValidation(testCase.value, testCase.options);
  const end = performance.now();
  
  return {
    index,
    timeTaken: end - start,
    result,
    value: testCase.value,
    options: testCase.options
  };
}

// Function to run all benchmarks and log the report
function runBenchmarks() {
  const benchmarkResults = testCases.map(benchmarkTestCase);
  const totalTime = benchmarkResults.reduce((acc, { timeTaken }) => acc + timeTaken, 0);
  const averageTime = totalTime / benchmarkResults.length;
  const performanceThreshold = averageTime * 1.5; // 50% above the average time
  
  console.log("Benchmark Report:");
  benchmarkResults.forEach(({ index, timeTaken, result, value, options }) => {
    const performance = timeTaken > performanceThreshold ? "Slow" : "Acceptable";
    console.log(`Test Case ${index}:`, {
      Value: value,
      Options: options,
      Result: result,
      TimeTaken: `${timeTaken.toFixed(3)} ms`,
      Performance: performance
    });
  });
  
  console.log(`Total Time for all Test Cases: ${totalTime.toFixed(3)} ms`);
}

// Run the benchmarks
// runBenchmarks();
export default isObjectWithValidation;
export { isObjectWithValidation };
// module.exports = { isObjectWithValidation };
//
