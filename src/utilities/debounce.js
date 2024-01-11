export const debounce = (mainFunction, delay) => {
  let timer;
  
  return function(...args) {
    const context = this; // Capture the context
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction.apply(context, args); // Apply the context and arguments
    }, delay);
  };
};
export default debounce;
