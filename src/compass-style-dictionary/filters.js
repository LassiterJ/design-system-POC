const normalizeTokenCriteria = (value) => {
  if (typeof value === 'string') {
    return [value];
  }
  if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
    return value;
  }
  console.error('Invalid token criteria: ', value);
  return [];
};

/**
 * Filters tokens based on specified criteria.
 *
 * @param {object} options - Configuration for token filtering.
 * @param {string[] | string} options.includeCriteria - Criteria for explicitly including tokens in the result.
 * @param {string[] | string} options.excludeCriteria - Criteria for explicitly excluding tokens from the result.
 * @param {string[]} options.matchAgainst - The set of values tokens are evaluated against to determine inclusion. Defaults to ["type"].
 * @param {boolean} options.allowPartialMatches - Enables partial matching for tokens against the criteria.
 * @param {boolean} options.prioritizeInclusion - When true, tokens matching both include and exclude criteria will be included.
 * @returns {function} A function tailored for filtering based on the specified criteria.
 */
export const filterTokensByCriteria = ({
  includeCriteria = [],
  excludeCriteria = [], // ['font']
  matchAgainst = ['type'],
  allowPartialMatches = false,
  prioritizeInclusion = false,
}) => {
  // Normalize include and exclude to arrays if they're strings
  const normalizedInclude = normalizeTokenCriteria(includeCriteria);
  const normalizedExclude = normalizeTokenCriteria(excludeCriteria);

  // If no criteria are specified, include all tokens by default
  if (normalizedInclude.length === 0 && normalizedExclude.length === 0) {
    console.warn('No criteria specified for filtering');
    return () => true;
  }

  const filterCriteria = (criteria) => {
    const partialMatch = (criteria) =>
      matchAgainst.some((value) => value.includes(criteria)); // TODO: Double check this
    const fullMatch = (criteria) => matchAgainst.includes(criteria);
    return allowPartialMatches
      ? normalizedInclude.some(partialMatch)
      : normalizedInclude.some(fullMatch);
  };
  const includeFilter = (token) => filterCriteria(token);
  const excludeFilter = (token) => filterCriteria(token);

  return (token) => {
    const isIncluded =
      normalizedInclude.length > 0 ? includeFilter(token) : true;
    const isExcluded =
      normalizedExclude.length > 0 ? excludeFilter(token) : false;

    // When a token is both included and excluded
    if (isIncluded && isExcluded) {
      // If prioritizeInclusion is true, include the token even if it's also excluded
      return prioritizeInclusion;
    }

    return isIncluded && !isExcluded;
  };
};

// export const filterTokensByType = ({
//   include = [],
//   exclude = [],
//   partial = false,
//   preferIncluded = false,
// }) => {
//   // Normalize include and exclude to arrays if they're strings
//   const normalizedInclude = typeof include === 'string' ? [include] : include;
//   const normalizedExclude = typeof exclude === 'string' ? [exclude] : exclude;
//
//   if (normalizedInclude.length === 0 && normalizedExclude.length === 0) {
//     console.warn('No types specified for filtering');
//     return (token) => true; // Always include if no criteria provided
//   }
//
//   const includeFilter = (token) =>
//     partial
//       ? normalizedInclude.some((type) => token.type.includes(type))
//       : normalizedInclude.includes(token.type);
//   const excludeFilter = (token) =>
//     partial
//       ? normalizedExclude.some((type) => token.type.includes(type))
//       : normalizedExclude.includes(token.type);
//
//   return (token) => {
//     const isIncluded =
//       normalizedInclude.length > 0 ? includeFilter(token) : true;
//     const isExcluded =
//       normalizedExclude.length > 0 ? excludeFilter(token) : false;
//
//     // When a token is both included and excluded
//     if (isIncluded && isExcluded) {
//       // If preferIncluded is true, include the token even if it's also excluded
//       // This essentially makes inclusion criteria take precedence over exclusion criteria
//       return preferIncluded;
//     }
//
//     // Default behavior when preferIncluded is not influencing the decision
//     return isIncluded && !isExcluded;
//   };
// };
