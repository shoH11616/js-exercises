// sierpinskiWorker.js

self.addEventListener("message", (event) => {
  const { width, height } = event.data;

  function drawSierpinski(x, y, size, depth) {
    if (depth === 0) {
      return [
        [
          { x, y },
          { x: x + size, y },
          { x: x + size / 2, y: y - size * Math.sin(Math.PI / 3) },
        ],
      ];
    }

    const halfSize = size / 2;
    const heightOffset = (size * Math.sin(Math.PI / 3)) / 2;

    return [
      ...drawSierpinski(x, y, halfSize, depth - 1),
      ...drawSierpinski(x + halfSize, y, halfSize, depth - 1),
      ...drawSierpinski(
        x + halfSize / 2,
        y - heightOffset,
        halfSize,
        depth - 1
      ),
    ];
  }

  const size = Math.min(width, height) * 0.9;
  const triangles = drawSierpinski(width / 2 - size / 2, height * 0.9, size, 6);

  self.postMessage({ triangles });
});
