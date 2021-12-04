/**
 * 获取参数类型
 * @param {*} obj 
 * @returns {string}
 */
function getType(obj) {
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase();
}
