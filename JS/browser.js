/**
 * 浏览器是否支持样式
 * @param {string} attribute
 * @param {string} value
 */
function cssSupports(attribute, value) {
  if (window.CSS && window.CSS.supports) {
    if (value === undefined) {
      return window.CSS.supports(attribute);
    }
    return window.CSS.supports(attribute, value);
  }
  const dom = document.createElement("div");
  if (attribute in dom.style) {
    dom.style[attribute] = value;
    return dom.style[attribute] === value;
  }
  return false;
}

/**
 * 返回触发事件函数
 * 便于添加触发事件
 * @param {string} type
 * @param {Function} cb
 * @returns {Function}
 */
function eventDispatch(type, cb) {
  return function (...args) {
    cb.apply(this, args);
    const typeName = type.toLowerCase();
    const event = new Event(typeName);
    event.arguments = args;
    window.dispatchEvent(event);
    const onTypeName = `on${typeName}`;
    if (typeof window[onTypeName] === "function") {
      window[onTypeName](...args);
    }
  };
}

/**
 * 为 History 的 pushState、replaceState 添加监听功能
 */
function historyAddListener() {
  const { history } = window;
  const pushState = history.pushState;
  history.pushState = eventDispatch("pushstate", pushState);
  const replaceState = history.replaceState;
  history.replaceState = eventDispatch("replacestate", replaceState);
}

/**
 * 获取光标选中的字符和索引
 * @returns
 */
function getSelectionInfo() {
  if (!window.getSelection) {
    return {};
  }
  const selection = window.getSelection(); // 获取Selection对象

  return {
    ...selection,
    selectedStr: selection.toString(),
    selectionStart: selection.anchorOffset,
    selectionEnd: selection.focusOffset,
  };
}
