// worker.js

self.addEventListener("message", (event) => {
  const { imageData, kernel, kernelSize, kernelSum } = event.data;
  const data = imageData.data;
  const outputData = new Uint8ClampedArray(data.length);

  for (let y = 0; y < imageData.height; y++) {
    for (let x = 0; x < imageData.width; x++) {
      let r = 0,
        g = 0,
        b = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const px = x + kx - Math.floor(kernelSize / 2);
          const py = y + ky - Math.floor(kernelSize / 2);

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
      outputData[offset] = r / kernelSum;
      outputData[offset + 1] = g / kernelSum;
      outputData[offset + 2] = b / kernelSum;
      outputData[offset + 3] = data[offset + 3];
    }
  }

  self.postMessage({
    outputData,
    width: imageData.width,
    height: imageData.height,
  });
});
