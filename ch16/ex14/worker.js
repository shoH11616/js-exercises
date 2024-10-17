import { parentPort, workerData } from "worker_threads";

const { imageData, width, height, kernel, kernelSize } = workerData;

/**
 * ガウシアンフィルタのカーネルを適用する関数
 *
 * @param {Uint8ClampedArray} imageData - 画像データ
 * @param {number} width - 画像の幅
 * @param {number} height - 画像の高さ
 * @param {number[][]} kernel - フィルタカーネル
 * @param {number} kernelSize - カーネルのサイズ
 * @returns {Uint8ClampedArray} - フィルタ適用後の画像データ
 */
function applyKernel(imageData, width, height, kernel, kernelSize) {
  const halfKernelSize = Math.floor(kernelSize / 2);
  const result = new Uint8ClampedArray(imageData.length);

  // 各ピクセルに対してカーネルを適用する
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0,
        sum = 0;

      // カーネルを適用する範囲をループ
      for (let ky = -halfKernelSize; ky <= halfKernelSize; ky++) {
        for (let kx = -halfKernelSize; kx <= halfKernelSize; kx++) {
          const posX = x + kx;
          const posY = y + ky;

          // 画像の境界チェック
          if (posX >= 0 && posX < width && posY >= 0 && posY < height) {
            const pixelIndex = (posY * width + posX) * 4;
            const kernelValue =
              kernel[ky + halfKernelSize][kx + halfKernelSize];

            // RGBおよびアルファ値にカーネル値を適用
            r += imageData[pixelIndex] * kernelValue;
            g += imageData[pixelIndex + 1] * kernelValue;
            b += imageData[pixelIndex + 2] * kernelValue;
            a += imageData[pixelIndex + 3] * kernelValue;
            sum += kernelValue;
          }
        }
      }

      // フィルタ適用後の値を結果にセット
      const index = (y * width + x) * 4;
      result[index] = r / sum;
      result[index + 1] = g / sum;
      result[index + 2] = b / sum;
      result[index + 3] = a / sum;
    }
  }
  return result;
}

// ガウシアンフィルタを適用したデータを計算
const filteredData = applyKernel(imageData, width, height, kernel, kernelSize);

// 親スレッドにフィルタ適用後のデータを送信
parentPort.postMessage(filteredData);
