import { Worker } from "worker_threads";
import { createCanvas, loadImage } from "canvas";
import fs from "fs";

// ガウシアンフィルタのカーネル
const gaussianKernel = [
  [1, 4, 7, 4, 1],
  [4, 16, 26, 16, 4],
  [7, 26, 41, 26, 7],
  [4, 16, 26, 16, 4],
  [1, 4, 7, 4, 1],
];
const kernelSize = gaussianKernel.length;

/**
 * 画像を読み込んでガウシアンフィルタを適用する関数
 *
 * @param {string} imagePath - 入力画像のパス
 * @param {string} outputPath - 出力画像のパス
 */
async function applyGaussianFilter(imagePath, outputPath) {
  const image = await loadImage(imagePath); // 画像を読み込む
  const canvas = createCanvas(image.width, image.height); // キャンバスを作成
  const ctx = canvas.getContext("2d"); // 2Dコンテキストを取得
  ctx.drawImage(image, 0, 0); // 画像をキャンバスに描画
  const imageData = ctx.getImageData(0, 0, image.width, image.height); // 画像データを取得

  // ワーカースレッドを作成し、画像データとフィルタ情報を渡す
  const worker = new Worker("./worker.js", {
    workerData: {
      imageData: imageData.data,
      width: image.width,
      height: image.height,
      kernel: gaussianKernel,
      kernelSize: kernelSize,
    },
  });

  // フィルタリングが完了したら結果を受け取る
  worker.on("message", (filteredData) => {
    ctx.putImageData(
      new ImageData(
        new Uint8ClampedArray(filteredData),
        image.width,
        image.height
      ),
      0,
      0
    );
    // 画像をPNG形式で保存
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
  });

  // エラーが発生した場合の処理
  worker.on("error", (err) => {
    console.error(err);
  });

  // ワーカーが終了した場合の処理
  worker.on("exit", (code) => {
    if (code !== 0) console.log(`Worker stopped with exit code ${code}`);
  });
}

// 実行例
applyGaussianFilter("input.png", "output.png");
