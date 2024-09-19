// index.js

/**
 * DOMContentLoadedイベントリスナーを設定
 * ページのコンテンツが完全に読み込まれたときに実行される
 */
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas"); // キャンバス要素を取得
  const ctx = canvas.getContext("2d"); // キャンバスの2Dコンテキストを取得

  canvas.width = window.innerWidth; // キャンバスの幅をウィンドウの幅に設定
  canvas.height = window.innerHeight; // キャンバスの高さをウィンドウの高さに設定

  const worker = new Worker("./sierpinskiWorker.js"); // 新しいWeb Workerを作成

  // Web Workerにメッセージを送信
  worker.postMessage({ width: canvas.width, height: canvas.height });

  // Web Workerからメッセージを受信したときの処理
  worker.addEventListener("message", (e) => {
    const { triangles } = e.data; // 受信したデータから三角形の配列を取得
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    ctx.fillStyle = "black"; // 塗りつぶしの色を黒に設定

    // 各三角形を描画
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
