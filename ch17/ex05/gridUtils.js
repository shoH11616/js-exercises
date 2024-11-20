// gridUtils.js
import { ROWS, COLS, RESOLUTION } from "./constants.js";

/**
 * gridをcanvasに描画する関数
 * @param {CanvasRenderingContext2D} ctx - 描画用の2Dコンテキスト
 * @param {Array} grid - セルの状態を表す2次元配列（true: 生存, false: 死亡）
 */
export function renderGrid(ctx, grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col]; // 現在のセルの状態を取得
      ctx.beginPath(); // パスを初期化
      ctx.rect(
        col * RESOLUTION, // セルのx座標
        row * RESOLUTION, // セルのy座標
        RESOLUTION, // セルの幅
        RESOLUTION // セルの高さ
      );
      ctx.fillStyle = cell ? "black" : "white"; // 生存セルは黒、死亡セルは白
      ctx.fill(); // セルを塗りつぶし
      ctx.stroke(); // セルの枠線を描画
    }
  }
}

/**
 * Life Gameのルールに基づいてグリッドを更新する関数
 * @param {Array} grid - 現在のセルの状態を表す2次元配列
 * @returns {Array} 更新後のセルの状態を表す2次元配列
 */
export function updateGrid(grid) {
  // 現在のグリッドを基に次の世代のグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]); // グリッドのディープコピー

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col]; // 現在のセルの状態を取得
      let numNeighbors = 0; // 隣接セルの生存数をカウント

      // 隣接する全セルをチェック
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) continue; // 自分自身は無視
          const x = row + i; // 隣接セルの行インデックス
          const y = col + j; // 隣接セルの列インデックス

          // 隣接セルがグリッド内に存在する場合のみカウント
          if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
            numNeighbors += grid[x][y] ? 1 : 0;
          }
        }
      }

      // Life Gameのルールに基づいてセルの状態を更新
      if (cell && (numNeighbors < 2 || numNeighbors > 3)) {
        // 過疎または過密でセルは死亡
        nextGrid[row][col] = false;
      } else if (!cell && numNeighbors === 3) {
        // 誕生条件を満たす場合、セルは生存
        nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid; // 更新されたグリッドを返す
}
