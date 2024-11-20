// index.js
import { ROWS, COLS, RESOLUTION } from "./constants.js";
import { renderGrid, updateGrid } from "./gridUtils.js";

// Canvas要素と描画コンテキストを取得
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");

// スタート/一時停止ボタンを取得
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

// Canvasのサイズを設定
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let animationId = null; // アニメーションIDを管理する変数
const sound = new Audio("./decision1.mp3"); // クリック時の音声

// グリッドの初期化（ランダムなセル状態を生成）
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
  );

// Canvasクリック時にセルの状態を切り替えるイベントリスナー
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect(); // Canvasの位置とサイズを取得
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top }; // クリック位置を計算

  const row = Math.floor(pos.y / RESOLUTION); // クリックされた行を計算
  const col = Math.floor(pos.x / RESOLUTION); // クリックされた列を計算
  grid[row][col] = !grid[row][col]; // セルの状態を反転
  sound.cloneNode().play(); // クリック音を再生
  renderGrid(ctx, grid); // グリッドを再描画
});

// グリッドを更新し描画する関数
function update() {
  grid = updateGrid(grid); // グリッドを更新
  renderGrid(ctx, grid); // 更新されたグリッドを描画
  animationId = requestAnimationFrame(update); // 次のフレームをリクエスト
}

// スタートボタンのクリックイベント
startButton.addEventListener("click", () => {
  if (animationId) return; // すでにアニメーションが動いている場合は何もしない
  update(); // アニメーションを開始
});

// 一時停止ボタンのクリックイベント
pauseButton.addEventListener("click", () => {
  if (!animationId) return; // アニメーションが動いていない場合は何もしない
  cancelAnimationFrame(animationId); // アニメーションを停止
  animationId = null; // アニメーションIDをリセット
});

// 初期状態のグリッドを描画
renderGrid(ctx, grid);
