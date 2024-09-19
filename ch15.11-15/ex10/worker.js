// worker.js

/**
 * メッセージイベントリスナーを設定
 * @param {Object} event - メッセージイベント
 * @param {Object} event.data - 画像データとカーネル情報
 * @param {ImageData} event.data.imageData - 画像データ
 * @param {Array<Array<number>>} event.data.kernel - カーネル
 * @param {number} event.data.kernelSize - カーネルのサイズ
 * @param {number} event.data.kernelSum - カーネルの合計値
 */
self.addEventListener("message", (event) => {
  const { imageData, kernel, kernelSize, kernelSum } = event.data;
  const data = imageData.data; // 画像データのピクセル配列
  const outputData = new Uint8ClampedArray(data.length); // 出力データの配列

  // 画像の各ピクセルを処理
  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let r = 0,
        g = 0,
        b = 0; // 赤、緑、青の値を初期化

      // カーネルを適用
      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = x + kx - Math.floor(kernelSize / 2);
          const py = y + ky - Math.floor(kernelSize / 2);

          // カーネルが画像の範囲内にある場合のみ処理
          if (
            px >= 0 &&
            px < imageData.width &&
            py >= 0 &&
            py < imageData.height
          ) {
            const offset = (py * imageData.width + px) * 4;
            r += data[offset] * kernel[ky][kx];
            g += data[offset + 1] * kernel[ky][kx];
            b += data[offset + 2] * kernel[ky][kx];
          }
        }
      }

      const offset = (y * imageData.width + x) * 4;
      outputData[offset] = r / kernelSum; // 赤の値を設定
      outputData[offset + 1] = g / kernelSum; // 緑の値を設定
      outputData[offset + 2] = b / kernelSum; // 青の値を設定
      outputData[offset + 3] = data[offset + 3]; // アルファ値を設定
    }
  }

  // 処理結果をメインスレッドに送信
  self.postMessage({
    outputData,
    width: imageData.width,
    height: imageData.height,
  });
});
