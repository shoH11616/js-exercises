// index.js
import { ROWS, COLS, RESOLUTION } from "./constants.js";
import { renderGrid, updateGrid } from "./gridUtils.js";

// Canvas要素とその描画コンテキストを取得
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");

// ボタン要素を取得
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

// Canvasのサイズを設定
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

let animationId = null; // アニメーションIDを保持する変数
const sound = new Audio("./decision1.mp3"); // クリック時に再生する音声

// グリッドを初期化（ランダムなセル状態を生成）
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
  );

// Canvasをクリックした際のセルの状態を切り替えるイベントリスナー
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect(); // Canvasの位置とサイズを取得
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top }; // クリック位置を計算

  const row = Math.floor(pos.y / RESOLUTION); // クリック位置から行を計算
  const col = Math.floor(pos.x / RESOLUTION); // クリック位置から列を計算
  grid[row][col] = !grid[row][col]; // セルの状態を反転
  sound.cloneNode().play(); // 音を再生
  renderGrid(ctx, grid); // グリッドを再描画
});

// グリッドの更新と描画を行う関数
function update() {
  grid = updateGrid(grid); // グリッドを更新
  renderGrid(ctx, grid); // 更新されたグリッドを描画
  animationId = requestAnimationFrame(update); // 次のフレームをリクエスト
}

// 開始ボタンのイベントリスナー
startButton.addEventListener("click", () => {
  if (animationId) return; // すでにアニメーションが実行中の場合は何もしない
  update(); // アニメーションを開始
});

// 一時停止ボタンのイベントリスナー
pauseButton.addEventListener("click", () => {
  if (!animationId) return; // アニメーションが実行中でない場合は何もしない
  cancelAnimationFrame(animationId); // アニメーションを停止
  animationId = null; // アニメーションIDをリセット
});

// 初期状態のグリッドを描画
renderGrid(ctx, grid);
