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

// 画像を読み込んでフィルタを適用する関数
async function applyGaussianFilter(imagePath, outputPath) {
  const image = await loadImage(imagePath);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, image.width, image.height);

  const worker = new Worker("./worker.js", {
    workerData: {
      imageData: imageData.data,
      width: image.width,
      height: image.height,
      kernel: gaussianKernel,
      kernelSize: kernelSize,
    },
  });

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
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
  });

  worker.on("error", (err) => {
    console.error(err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) console.log(`Worker stopped with exit code ${code}`);
  });
}

// 実行例
applyGaussianFilter("input.png", "output.png");
