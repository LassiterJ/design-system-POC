export const throttle = (mainFunction, delay) => {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return mainFunction.apply(this, args);
  };
};

export default throttle;
