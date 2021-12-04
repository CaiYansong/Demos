/**
 * 根据图片路径将图片转为 去除头部信息 的 base64
 * @param {string} url
 */
function convertImgToBase64(url) {
  return new Promise((suc) => {
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/jpg");
      // 去除base64头部信息
      dataURL = dataURL.replace(
        /\r|\n|(data:image\/(jgp|png|jpeg|gif);base64,)/g,
        ""
      );
      suc(dataURL);
      canvas = null;
    };
    img.src = url;
  });
}

/**
 * base64 转换成图片
 * @param {string} dataUrl
 */
function base64DataToBlob(dataUrl) {
  // 去掉url的头，并转换为byte
  var bytes = window.atob(urlData.split(",")[1]);
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: "image/png" });
}
