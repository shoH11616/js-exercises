// sierpinskiWorker.js

/**
 * メッセージイベントリスナーを設定
 * @param {Object} event - メッセージイベント
 * @param {Object} event.data - キャンバスの幅と高さ
 * @param {number} event.data.width - キャンバスの幅
 * @param {number} event.data.height - キャンバスの高さ
 */
self.addEventListener("message", (event) => {
  const { width, height } = event.data;

  /**
   * シェルピンスキーの三角形を描画する再帰関数
   * @param {number} x - 三角形の左下のx座標
   * @param {number} y - 三角形の左下のy座標
   * @param {number} size - 三角形の一辺の長さ
   * @param {number} depth - 再帰の深さ
   * @returns {Array<Array<Object>>} - 三角形の頂点の配列
   */
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

  const size = Math.min(width, height) * 0.9; // 三角形のサイズをキャンバスのサイズに基づいて設定
  const triangles = drawSierpinski(width / 2 - size / 2, height * 0.9, size, 6); // シェルピンスキーの三角形を描画

  // 処理結果をメインスレッドに送信
  self.postMessage({ triangles });
});
