
/* Custom Filters */


// Higher-order function that returns a filter function to exclude tokens of a certain type(s)
// export const excludeTypes = (...excludedTypes) => {
//   // The returned function is the actual filter used by Style Dictionary
//   return (token) =>  {
//     console.log("excludedTypes: ", excludedTypes);
//     console.log("token.type: ", token.type);
//     // Check if the token's type is in the list of types to exclude
//     return !excludedTypes.includes(token.type);
//   };
// }
// // Higher-order function that returns a filter function to exclude tokens that contain a certain type(s)
// // Example: excludePartialTypes('size') will exclude any token that contains the string 'size' in its type like "primitive/size"
// export const excludePartialTypes = (...excludedTypes) => {
//   // The returned function is the actual filter used by Style Dictionary
//   return (token) =>  {
//     // Check if PART the token's type is in the list of types to exclude
//     const isExcluded =!!excludedTypes.find(element => token.type.includes(element));
//     console.log("isExcludedPartial: ", isExcluded);
//     return isExcluded
//   };
// }
//
// // Higher-order function that returns a filter function to include only tokens of a certain type(s)
// export const includeTypes = (...includedTypes) => {
//   // The returned function is the actual filter used by Style Dictionary
//   return (token) => {
//     console.log("includedTypes: ", includedTypes);
//     console.log("token.type: ", token.type);
//     // Check if the token's type is in the list of types to exclude
//     return includedTypes.includes(token.type);
//   };
// }
//
// // Higher-order function that returns a filter function to include tokens that contain a certain type(s)
// // Example: includePartialTypes('size') will include any token that contains the string 'size' in its type like "primitive/size"
// export const includePartialTypes = (...includedTypes) => {
//   // The returned function is the actual filter used by Style Dictionary
//   return (token) =>  {
//     // Check if PART the token's type is in the list of types to include
//     const isIncluded =!!includedTypes.find(element => token.type.includes(element));
//     console.log("isIncludedPartial: ", isIncluded);
//     return isIncluded;
//   };
// }
//
// export const filterTypes = ({options}) => {
//   const {include, exclude, includePartial, excludePartial, preferIncluded, preferIncluded} = options;
//   const noTypesToFilter = !include && !exclude;
//   const hasConflictingOptions = overwriteIncluded && preferIncluded;
//   if(noTypesToFilter || hasConflictingOptions){
//     return;
//   }
//
//   const includeFilter = (include?.length > 0) && includePartial ? includePartialTypes(...include): includeTypes(...include);
//   const excludeFilter = (exclude?.length > 0) && excludePartial ? excludePartialTypes(...exclude): excludeTypes(...exclude);
//
//   const isIncludedAndExcluded = includeFilter && excludeFilter;
//   if(isIncludedAndExcluded && preferIncluded){
//     return includeFilter;
//   }
//
//   if(isIncludedAndExcluded && overwriteIncluded){
//     return excludeFilter;
//   }
//
//   // Return a new filter function that checks both conditions
//   return (token) => {
//     return includeFilter(token) && excludeFilter(token);
//   };
// }


/* Custom Filters */

// Higher-order functions that returns a filter function to include or exclude only tokens of a certain type(s)
export const excludeTypes = (...excludedTypes) => token => !excludedTypes.includes(token.type);
export const includeTypes = (...includedTypes) => token => includedTypes.includes(token.type);

// Handles partial type matching
// excludes tokens if their type includes any of the specified partial types.
export const excludePartialTypes = (...excludedTypes) => token => !excludedTypes.some(type => token.type.includes(type));
// includes tokens if their type includes any of the specified partial types.
export const includePartialTypes = (...includedTypes) => token => includedTypes.some(type => token.type.includes(type));

export const filterTypes = (options) => {
  const {
    include = [],
    exclude = [],
    includePartial = false,
    excludePartial = false,
    preferIncluded = false
  } = options;
  
  if (include.length === 0 && exclude.length === 0) {
    console.warn('No types specified for filtering');
    return token => true; // No filtering applied, all tokens pass.
  }
  
  const includeFilter = includePartial ? includePartialTypes(...include) : includeTypes(...include);
  const excludeFilter = excludePartial ? excludePartialTypes(...exclude) : excludeTypes(...exclude);
  
  return (token) => {
    const isIncluded = include.length > 0 ? includeFilter(token) : false; // Defaults to true if no include criteria provided
    const isExcluded = exclude.length > 0 ? excludeFilter(token) : false; // Defaults to false if no exclude criteria provided
    
    // If both included and excluded, determine which to prioritize based on preferIncluded
    if (isIncluded && !isExcluded) {
      return preferIncluded;
    }
    
    // Default behavior: a token must be included and not excluded
    return isIncluded && isExcluded;
  };
};
//
// // Mock tokens for testing
// const tokens = [
//   { name: "colorPrimary", type: "color", value: "#007bff" },
//   { name: "fontSizeBase", type: "size/font", value: "1rem" },
//   { name: "marginLarge", type: "size/margin", value: "2rem" },
//   { name: "paddingSmall", type: "size/padding", value: "0.5rem" },
//   { name: "borderRadius", type: "border/radius", value: "4px" },
// ];
//
// // Test the excludeTypes filter: Exclude tokens of type 'color'
// // Expected result: [ 'fontSizeBase', 'marginLarge', 'paddingSmall', 'borderRadius' ]
// console.log("Exclude Colors:", tokens.filter(excludeTypes("color")).map(token => token.name));
//
// // Test the includeTypes filter: Include only tokens of type 'size/font', 'size/margin', 'size/padding'
// // Expected result: [ 'fontSizeBase', 'marginLarge', 'paddingSmall' ]
// console.log("Include Sizes:", tokens.filter(includeTypes("size/font", "size/margin", "size/padding")).map(token => token.name));
//
// // Test the excludePartialTypes filter: Exclude tokens that have 'size' in their type
// // Expected result: [ 'colorPrimary', 'borderRadius' ]
// console.log("Exclude Size With Partial Match:", tokens.filter(excludePartialTypes("size")).map(token => token.name));
//
// // Test the includePartialTypes filter: Include tokens that have 'size' in their type
// // Expected result: [ 'fontSizeBase', 'marginLarge', 'paddingSmall' ]
// console.log("Include Size With Partial Match:", tokens.filter(includePartialTypes("size")).map(token => token.name));
//
// // Test combining filters with filterTypes: Include tokens of type 'size' and 'color', exclude tokens with 'font' in their type
// // Expected result: ['colorPrimary', 'marginLarge', 'paddingSmall']
// // If no overwrite flags are set, the default is overwriting include with exclude.
// console.log("Combined Filters:", tokens.filter(filterTypes({ include: ["size", "color"], exclude: ["font"], includePartial: true, excludePartial: true })).map(token => token.name));
//
// // Test with include and exclude filters: 'color' tokens should not be included despite it's presence in the include filter
// // Expected result:  [ 'fontSizeBase', 'marginLarge' ]
// // If there is not a preferIncluded flag set, the default is overwriting include with exclude.
// console.log("Overwrite Included Filters:", tokens.filter(filterTypes({ include: ["size/font","size/margin","color"], exclude: ["color"]})).map(token => token.name));
//
// // Test preferIncluded with include and exclude filters:The 'color' token should be included despite it's presence in the exclude filter
// // Expected result: [ 'fontSizeBase', 'marginLarge', 'colorPrimary' ]
// // This test demonstrates the effect of the preferIncluded flag.
// console.log("Overwrite Excluded Filters:", tokens.filter(filterTypes({ include: ["size/font","size/margin", "color"], exclude: ["color"], preferIncluded: true})).map(token => token.name));
//
// // Test with include and exclude filters and allow partials for both include and exclude filters: fontSizeBase should not be included despite the presence of the "size" partial type in the include filter
// // Expected result: [ 'marginLarge', 'paddingSmall', 'colorPrimary' ]
// console.log("Overwrite Included Filters with Partial Match:", tokens.filter(filterTypes({ include: ["size","color"], exclude: ["font"], includePartial: true, excludePartial: true })).map(token => token.name));
//
// // Test preferIncluded with include and exclude filters and allow partials for both include and exclude filters: All size related tokens should be included despite the partial type "font" in the exclude filter
// // Expected result: [ 'fontSizeBase', 'marginLarge', 'paddingSmall', 'colorPrimary' ]
// // This test demonstrates the effect of the preferIncluded flag.
// console.log("Overwrite Excluded Filters with Partial Match:", tokens.filter(filterTypes({ include: ["size", "color"], exclude: ["font"], preferIncluded: true, includePartial: true, excludePartial: true })).map(token => token.name));
//
//
// // Assuming the filterTypes and mock tokens setup from previous examples
//
// // Test 1: No filtering criteria provided (Should return all tokens)
// console.log("No Filtering Criteria:", tokens.filter(filterTypes({})).map(token => token.name));
//
// // Test 2: Exclude with partial match but no tokens match the criteria (Should return all tokens as none are excluded)
// console.log("Exclude Non-matching Partial Type:", tokens.filter(filterTypes({ exclude: ["nonexistent"], excludePartial: true })).map(token => token.name));
//
// // Test 3: Include with partial match but no tokens match the criteria (Should return no tokens as none are included)
// console.log("Include Non-matching Partial Type:", tokens.filter(filterTypes({ include: ["nonexistent"], includePartial: true })).map(token => token.name));
//
// // Test 4: Exclude all tokens of a certain type, then include a specific token by type using partial match (Should only return the specifically included token)
// console.log("Exclude Type Then Include Specific Token By Partial Type:", tokens.filter(filterTypes({ exclude: ["size"], include: ["font"], excludePartial: false, includePartial: true })).map(token => token.name));
//
// // Test 5: Include a type, then exclude a specific token of that type by type using partial match (Should exclude the specifically mentioned token)
// console.log("Include Type Then Exclude Specific Token By Partial Type:", tokens.filter(filterTypes({ include: ["size"], exclude: ["font"], includePartial: true, excludePartial: true })).map(token => token.name));
//
// // Test 6: Simultaneously exclude and include based on partial type, where include criteria is more specific than exclude
// console.log("Simultaneous Exclude and Include with More Specific Include:", tokens.filter(filterTypes({ include: ["size/margin"], exclude: ["size"], includePartial: true, excludePartial: true })).map(token => token.name));
//
// // Test 7: Prefer included when both include and exclude match, with overlapping partial types
// console.log("Prefer Included with Overlapping Partial Types:", tokens.filter(filterTypes({ include: ["size"], exclude: ["padding"], preferIncluded: true, includePartial: true, excludePartial: true })).map(token => token.name));
