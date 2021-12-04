/**
 * 防抖。只在最后一次触发的 delay 时间后调用。
 * @param {Function} cb
 * @param {number} delay
 * @returns {Function}
 */
function debounce(cb, delay = 1000) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb && cb.apply(this, args);
      timer = null;
    }, delay);
  };
}
