// 画像ファイルの選択イベントリスナーを追加
document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  // ファイルの読み込みが完了したときのイベントリスナー
  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  // 画像の読み込みが完了したときのイベントリスナー
  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    // キャンバスのサイズを画像のサイズに設定
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    // 画像をキャンバスに描画
    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    // ガウシアンフィルタのカーネル (5x5)
    const kernel = [
      [1, 4, 7, 4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1, 4, 7, 4, 1],
    ];
    const kernelSize = 5;
    const kernelSum = 273; // カーネルの要素の合計

    const outputData = new Uint8ClampedArray(data.length);

    // ガウシアンフィルタの適用
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let r = 0,
          g = 0,
          b = 0;

        // カーネルを適用してピクセルの色を計算
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const px = x + kx - Math.floor(kernelSize / 2);
            const py = y + ky - Math.floor(kernelSize / 2);

            if (px >= 0 && px < img.width && py >= 0 && py < img.height) {
              const offset = (py * img.width + px) * 4;
              r += data[offset] * kernel[ky][kx];
              g += data[offset + 1] * kernel[ky][kx];
              b += data[offset + 2] * kernel[ky][kx];
            }
          }
        }

        const offset = (y * img.width + x) * 4;
        outputData[offset] = r / kernelSum;
        outputData[offset + 1] = g / kernelSum;
        outputData[offset + 2] = b / kernelSum;
        outputData[offset + 3] = data[offset + 3]; // アルファチャンネルはそのまま
      }
    }

    // フィルタ適用後の画像データをキャンバスに描画
    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  // ファイルをデータURLとして読み込む
  reader.readAsDataURL(file);
});
