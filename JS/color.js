/**
 * 随机 RGBA 颜色
 * @param {Number} opacity
 * @returns
 */
function getRGBAColor(opacity) {
  var max = 256;
  var r = Math.floor(Math.random() * max);
  var g = Math.floor(Math.random() * max);
  var b = Math.floor(Math.random() * max);
  var a = opacity || Math.random().toFixed(2);
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

/**
 * 随机6位十六进制颜色
 * @returns
 */
function getHEXColor() {
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += "0123456789abcdef"[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * 十六进制颜色取反
 * @param {string} color #ffffff
 */
function reversalHEXColor(value = "") {
  var len = value.length;
  if (value.indexOf("#") >= 0 && len !== 4 && len !== 7) {
    throw new Error("确认颜色字符串长度是否正确");
  }
  if (value.indexOf("#") < 0 && len !== 3 && len !== 6) {
    throw new Error("确认颜色字符串长度是否正确");
  }
  var color = value.replace("#", "");
  if (color.length === 3) {
    color = color
      .split("")
      .map((item) => item.repeat(2))
      .join("");
  }
  var colorValue = "0x" + color;
  // 解决刚好是 #ffffff 会为 0 的情况
  var str = "000000" + (0xffffff - colorValue).toString(16);
  return "#" + str.substring(str.length - 6, str.length);
}

/**
 * 颜色取反
 * @param colorStr #000000 | #000 | rgb(0, 0, )
 */
function reversalColor(colorStr) {
  var HexReg = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/gi;
  var shortHexReg = /^#([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/gi;
  var rgbReg = /^rgb\((\d{1,3}), *(\d{1,3}), *(\d{1,3})\)$/gi;

  var c1 = 0,
    c2 = 0,
    c3 = 0;
  var parseHexToInt = function (hex) {
    return parseInt(hex, 16);
  };
  var parseIntToHex = function (int) {
    return int.toString(16);
  };

  if (HexReg.test(colorStr)) {
    HexReg.exec(colorStr);
    c1 = parseHexToInt(RegExp.$1);
    c2 = parseHexToInt(RegExp.$2);
    c3 = parseHexToInt(RegExp.$3);
  } else if (shortHexReg.test(colorStr)) {
    shortHexReg.exec(colorStr);
    c1 = parseHexToInt(RegExp.$1 + RegExp.$1);
    c2 = parseHexToInt(RegExp.$2 + RegExp.$2);
    c3 = parseHexToInt(RegExp.$3 + RegExp.$3);
  } else if (rgbReg.test(colorStr)) {
    // rgb color 直接就是十进制，不用转换
    rgbReg.exec(colorStr);
    c1 = RegExp.$1;
    c2 = RegExp.$2;
    c3 = RegExp.$3;
    if (0 <= c1 && c1 <= 255 && 0 <= c2 && c2 <= 255 && 0 <= c3 && c3 <= 255) {
      return `rgb(${255 - c1}, ${255 - c2}, ${255 - c3})`;
    }
    throw new Error(
      "颜色数字需要在 0-255 范围内"
    );
  } else {
    throw new Error("颜色字符串近支持以下格式：rgb(0,0,0)、#000000、#f00");
  }
  c1 = parseIntToHex(255 - c1);
  c2 = parseIntToHex(255 - c2);
  c3 = parseIntToHex(255 - c3);
  return (
    "#" +
    (c1 < 10 ? "0" + c1 : c1) +
    (c2 < 10 ? "0" + c2 : c2) +
    (c3 < 10 ? "0" + c3 : c3)
  );
}
