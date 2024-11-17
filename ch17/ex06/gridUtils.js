// gridUtils.js
import { ROWS, COLS, RESOLUTION } from "./constants.js";

/**
 * grid を canvas に描画
 * @param {CanvasRenderingContext2D} ctx - 描画用のコンテキスト
 * @param {Array} grid - セルの状態を表す2次元配列
 */
export function renderGrid(ctx, grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

/**
 * Life Game のルールに従ってセルを更新
 * @param {Array} grid - 現在のセルの状態を表す2次元配列
 * @returns {Array} - 更新されたセルの状態を表す2次元配列
 */
export function updateGrid(grid) {
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      let numNeighbors = 0;

      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) continue;
          const x = row + i;
          const y = col + j;

          if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
            numNeighbors += grid[x][y] ? 1 : 0;
          }
        }
      }

      if (cell && (numNeighbors < 2 || numNeighbors > 3)) {
        nextGrid[row][col] = false;
      } else if (!cell && numNeighbors === 3) {
        nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid;
}
