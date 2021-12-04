/**
 * 节流。高频触发，只在制定时间间隔进行调用
 * V1: 利用 setTimeout 的定时。（首次不会立即执行）
 * @param {Function} cb
 * @param {number} delay
 * @returns {Function}
 */
function throttling(cb, delay = 1000) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb && cb.apply(this, args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
}

/**
 * 节流。高频触发，只在制定时间间隔进行调用。
 * V2: 利用时间戳判断。（首次会立即执行）
 * @param {Function} cb
 * @param {number} delay
 * @returns {Function}
 */
function throttling(cb, delay = 1000) {
  let start = 0;
  return function (...args) {
    const now = Date.now();
    if (start + delay > now) {
      return;
    }
    cb && cb.apply(this, args);
    start = now;
  };
}

/**
 * 节流。高频触发，只在制定时间间隔进行调用。
 * V3: setTimeout + 时间戳。根据剩余时间执行。
 * @param {Function} cb
 * @param {number} delay
 * @returns {Function}
 */
function throttling(cb, delay = 1000) {
  let start = Date.now();
  let timer = null;
  return function (...args) {
    const now = Date.now();
    const remaining = now - (start + delay);
    clearTimeout(timer);
    if (remaining <= 0) {
      cb && cb.apply(this, args);
      start = now;
      return;
    }
    timer = setTimeout(() => {
      cb && cb.apply(this, args);
      start = now;
    }, remaining);
  };
}
