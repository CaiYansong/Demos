/**
 * 获取 url 的参数
 * @param {string} key
 * @param {string} search
 */
function getUrlParam(key, url = "") {
  var query =
    url.substr(url.indexOf("?") + 1) || window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == key) {
      return pair[1];
    }
  }
  return "";
}

/**
 * 获取 url 的参数
 * @param {String} key
 */
function getUrlParam(key) {
  const url = window.location.href;

  if (!url || !key) {
    return "";
  }
  const encodeURIStr = decodeURI(url);
  const regStr = new RegExp(`(${key}=)(.*?)([;&]|$)`);
  const matchResult = encodeURIStr.match(regStr);
  return matchResult && matchResult.length > 2 ? matchResult[2] : "";
}

/**
 * 获取 url 的参数
 * @param {string} key 要获取的key
 * @param {string} url url
 */
export function getUrlParam(key, url) {
  if (!key) return;

  let parsed = "";
  if (url) {
    parsed = url.substr(url.indexOf("?") + 1);
  } else {
    parsed = window.location.search.substr(1);
  }

  const str = decodeURI(parsed);
  const regStr = new RegExp("(" + key + "=)(.*?)([;&]|$)");
  return !!str.match(regStr) ? str.match(regStr)[2] : "";
}

/**
 * 获取url的参数
 * @param {string} key
 * 可匹配 hash 链接后的 ?参数
 */
function getUrlParam(key) {
  const param = window.location.href.match(
    new RegExp(`(\\?|&)${key}=(.*?)([;&]|$)`)
  );
  if (param && param.length > 2) {
    return param[2];
  }
  return "";
}

/**
 * 获取url的参数
 * IE 不兼容
 * @param {string} key
 */
function getUrlParam(key) {
  const url = new URL(window.location.href);
  return url.searchParams.get(key);
}

/**
 * 设置当前窗口 url 中 param 的值
 * @param {*} key
 * @param {*} value
 */
function setUrlParam(key, value) {
  var query = location.search.substring(1);
  var p = new RegExp(`(^|&${key})=[^&]*`);
  if (p.test(query)) {
    query = query.replace(p, `$1=${value}`);
    location.search = `?${query}`;
  } else if (query === "") {
    location.search = `?${key}=${value}`;
  } else {
    location.search = `?${query}&${key}=${value}`;
  }
}
