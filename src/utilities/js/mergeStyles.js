
// Merges CSS styles like `classNames` merges CSS classes
// Got from https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/helpers/merge-styles.ts
export function mergeStyles(...styles) {
  let result= {};
  
  for (const style of styles) {
    if (style) {
      result = { ...style, ...result };
    }
  }
  
  return Object.keys(result).length ? result : undefined;
}
