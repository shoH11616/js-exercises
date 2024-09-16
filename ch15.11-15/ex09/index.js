// Webソケットがうまく起動できなかった。

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.11-15/ex19/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

/**
 * grid を canvas に描画
 * @param {Array} grid - セルの状態を表す2次元配列
 */
function renderGrid(grid) {
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
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      let numNeighbors = 0;

      // 周囲のセルの生存数を数える
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const x = row + i;
          const y = col + j;

          if (x >= 0 && x < ROWS && y >= 0 && y < COLS) {
            const currentNeighbor = grid[x][y];
            numNeighbors += currentNeighbor ? 1 : 0;
          }
        }
      }

      // Life Game のルールに従って次の状態を決定する
      if (cell && (numNeighbors < 2 || numNeighbors > 3)) {
        nextGrid[row][col] = false;
      } else if (!cell && numNeighbors === 3) {
        nextGrid[row][col] = true;
      }
    }
  }
  return nextGrid;
}

// WebSocketサーバーのURL
const ws = new WebSocket("ws://localhost:3003");

// WebSocket接続が開かれたときの処理
ws.addEventListener("open", () => {
  console.log("Connected to WebSocket server");
});

// WebSocketメッセージを受信したときの処理
ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "update":
      grid = data.grid;
      renderGrid(grid);
      break;
    case "pause":
      cancelAnimationFrame(animationId);
      animationId = null;
      break;
    case "start":
      if (!animationId) {
        update();
      }
      break;
  }
});

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);

  // WebSocketサーバーにセルの反転を通知
  ws.send(JSON.stringify({ type: "toggle", row, col }));
});

/**
 * requestAnimationFrame によって一定間隔で更新・描画を行う
 * NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
 * https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
 */
function update() {
  grid = updateGrid(grid);
  renderGrid(grid);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  update();
  // WebSocketサーバーにゲームの開始を通知
  ws.send(JSON.stringify({ type: "start" }));
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
  // WebSocketサーバーにゲームの一時停止を通知
  ws.send(JSON.stringify({ type: "pause" }));
});

// 初期状態のグリッドを描画
renderGrid(grid);
