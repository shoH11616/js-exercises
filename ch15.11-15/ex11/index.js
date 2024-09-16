// index.js

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const worker = new Worker("./sierpinskiWorker.js");

  worker.postMessage({ width: canvas.width, height: canvas.height });

  worker.addEventListener("message", (e) => {
    const { triangles } = e.data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    triangles.forEach((triangle) => {
      ctx.beginPath();
      ctx.moveTo(triangle[0].x, triangle[0].y);
      ctx.lineTo(triangle[1].x, triangle[1].y);
      ctx.lineTo(triangle[2].x, triangle[2].y);
      ctx.closePath();
      ctx.fill();
    });
  });
});
