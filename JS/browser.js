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
 * 判断浏览器是否支持 webp
 * 通过获取浏览器的 navigator.userAgent 来判断浏览器是否支持 webp 格式的图片；
 * 该函数方法的缺陷是，如果用户修改了 navigator.userAgent 会导致判断出现不准确；
 * @returns {boolean}
 */
function browserCheckWebpByUA() {
  // 取得浏览器的 userAgent 字符串；
  var userAgent = navigator.userAgent;
  // 判断是否为 IE 版本小于 11 的浏览器；
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
  // 判断是否为 IE11 浏览器；
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE || isIE11) {
    // IE 浏览器，不支持 webp 格式的图片；
    return false;
  } else {
    // 非 IE 浏览器，支持 webp 格式的图片；
    return true;
  }
}

/**
 * 判断浏览器是否支持 webp
 * 通过图片是否加载成功，判断是否支持 webp
 * 参数 imgPath 为准备加载的尺寸不为零的 webp 图片的存储路径；
 * @param {string} imgPath
 * @param {Function} cb 接受结果的回调
 */
function browserCheckWebpByLoad(imgPath, cb) {
  var isWebP = false;
  var imgCheckWebP = new Image();
  imgCheckWebP.src =
    imgPath ||
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  // onload 事件在图片成功加载完成后立即执行；
  imgCheckWebP.onload = function () {
    // 如果能获取到图片的宽度和高度，就说明是支持浏览器 WebP ，反之则不支持。
    isWebP = !!(imgCheckWebP.height > 0 && imgCheckWebP.width > 0);
    if (isWebP) {
      return cb && cb(true);
    } else {
      return cb && cb(false);
    }
  };
  // 如果浏览器不支持 webp 图片，图片加载失败，那么触发 onerror 方法 ；
  imgCheckWebP.onerror = function () {
    return cb && cb(false);
  };
}

/**
 * 判断浏览器是否支持 webp
 * 通过 Chrome 浏览器开发者工具抓包显示，可以通过查看响应头和请求头相关字段；
 * 判断其 Accept 里是否含有 image/webp 字段，如果包含则说明支持 WebP ，反之则不支持。
 * @returns {boolean}
 */
function browserCheckWebpByHeader() {
  try {
    // !![].map 主要是判断浏览器是否为 IE9+ ，以免 toDataURL 方法会挂掉；
    // 如果你直接对数组原型扩展了 map 方法，则需要使用 !![].map 以外的方法进行判断 ，例如  !!window.addEventListener 等；
    return (
      !![].map &&
      document
        .createElement("canvas")
        .toDataURL("image/webp")
        .indexOf("data:image/webp") == 0
    );
  } catch (err) {
    return false;
  }
}

/**
 * 判断浏览器是否支持 webp
 * 使用 canvas 的 toDataURL 进行判断
 * @returns {boolean}
 */
function browserCheckWebpByCanvas() {
  try {
    return (
      document
        .createElement("canvas")
        .toDataURL("image/webp", 0.5)
        .indexOf("data:image/webp") === 0
    );
  } catch (err) {
    return false;
  }
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
