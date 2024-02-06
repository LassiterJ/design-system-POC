// export const createTypeFilter =
//   (types, { partial = false } = {}) =>
//   (token) =>
//     partial
//       ? types.some((type) => token.type.includes(type))
//       : types.includes(token.type);

// export const filterTokens = ({
//   include = [],
//   exclude = [],
//   partial = false,
// } = {}) => {
//   // Validate options
//   if (!include.length && !exclude.length) {
//     console.warn('filterTokens: No include or exclude types specified.');
//     return () => true; // Return a function that includes all tokens by default.
//   }
//
//   // Generate include and exclude filters based on options
//   const includeFilter = include.length
//     ? createTypeFilter(include, { partial })
//     : () => true;
//   const excludeFilter = exclude.length
//     ? createTypeFilter(exclude, { partial })
//     : () => false;
//
//   // Combined filtering logic
//   return (token) => includeFilter(token) && !excludeFilter(token);
// };
export const filterTokensByType = ({
  include = [],
  exclude = [],
  partial = false,
  preferIncluded = false,
}) => {
  // Normalize include and exclude to arrays if they're strings
  const normalizedInclude = typeof include === 'string' ? [include] : include;
  const normalizedExclude = typeof exclude === 'string' ? [exclude] : exclude;

  if (normalizedInclude.length === 0 && normalizedExclude.length === 0) {
    console.warn('No types specified for filtering');
    return (token) => true; // Always include if no criteria provided
  }

  const includeFilter = (token) =>
    partial
      ? normalizedInclude.some((type) => token.type.includes(type))
      : normalizedInclude.includes(token.type);
  const excludeFilter = (token) =>
    partial
      ? normalizedExclude.some((type) => token.type.includes(type))
      : normalizedExclude.includes(token.type);

  return (token) => {
    const isIncluded =
      normalizedInclude.length > 0 ? includeFilter(token) : true;
    const isExcluded =
      normalizedExclude.length > 0 ? excludeFilter(token) : false;

    // When a token is both included and excluded
    if (isIncluded && isExcluded) {
      // If preferIncluded is true, include the token even if it's also excluded
      // This essentially makes inclusion criteria take precedence over exclusion criteria
      return preferIncluded;
    }

    // Default behavior when preferIncluded is not influencing the decision
    return isIncluded && !isExcluded;
  };
};
