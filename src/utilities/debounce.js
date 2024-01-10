export const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
  };
};
