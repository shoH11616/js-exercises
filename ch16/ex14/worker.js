import { parentPort, workerData } from "worker_threads";

const { imageData, width, height, kernel, kernelSize } = workerData;

function applyKernel(imageData, width, height, kernel, kernelSize) {
  const halfKernelSize = Math.floor(kernelSize / 2);
  const result = new Uint8ClampedArray(imageData.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0,
        sum = 0;

      for (let ky = -halfKernelSize; ky <= halfKernelSize; ky++) {
        for (let kx = -halfKernelSize; kx <= halfKernelSize; kx++) {
          const posX = x + kx;
          const posY = y + ky;

          if (posX >= 0 && posX < width && posY >= 0 && posY < height) {
            const pixelIndex = (posY * width + posX) * 4;
            const kernelValue =
              kernel[ky + halfKernelSize][kx + halfKernelSize];

            r += imageData[pixelIndex] * kernelValue;
            g += imageData[pixelIndex + 1] * kernelValue;
            b += imageData[pixelIndex + 2] * kernelValue;
            a += imageData[pixelIndex + 3] * kernelValue;
            sum += kernelValue;
          }
        }
      }

      const index = (y * width + x) * 4;
      result[index] = r / sum;
      result[index + 1] = g / sum;
      result[index + 2] = b / sum;
      result[index + 3] = a / sum;
    }
  }

  return result;
}

const filteredData = applyKernel(imageData, width, height, kernel, kernelSize);
parentPort.postMessage(filteredData);
