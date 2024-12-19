// このファイルはパズル時計のメインロジックを扱う
// パズルピースを並び替えて時計を完成させるゲーム
// 難易度(3x3,4x4)選択やスコア計算、ベストスコアのローカル保存などを行う
// 時間計測やスコア表示、クリア後のアニメーションも含む

const puzzleContainer = document.getElementById("puzzle-container"); // パズル表示領域DOM取得
const timerDisplay = document.getElementById("timer-display"); // プレイ時間表示用DOM取得
const resetButton = document.getElementById("reset-button"); // リセットボタンDOM取得
const difficultySelect = document.getElementById("difficulty"); // 難易度選択用DOM取得
const scoreDisplay = document.getElementById("score-display"); // スコア表示用DOM取得
const bestScoreDisplay = document.getElementById("best-score-display"); // ベストスコア表示用DOM取得

let draggedPiece = null; // ドラッグ中のピース参照保持
let targetPiece = null; // ドロップ先のピース参照保持

const svgSize = 300; // 時計SVGの大きさ(幅・高さ)
let gridSize = 3; // パズルのグリッドサイズ(初期は3x3)

// 状態管理用の変数
let startTime = null; // ゲーム開始時間
let timerInterval = null; // プレイ時間更新用intervalID
let updateClockInterval = null; // 完成後の時計更新intervalID
let isCompleted = false; // パズル完成フラグ
let moveCount = 0; // ピース交換手数カウント

// ベストスコアを保存するローカルストレージキー
const BEST_SCORE_KEY = "puzzle-best-score";

// ページロード時にベストスコアがあれば表示
window.addEventListener("DOMContentLoaded", () => {
  // DOM読み込み完了時イベント設定
  const bestScore = localStorage.getItem(BEST_SCORE_KEY); // ローカルストレージからベストスコア取得
  if (bestScore !== null) {
    // ベストスコアが存在する場合
    bestScoreDisplay.textContent = `ベストスコア: ${bestScore}`; // テキスト更新
    bestScoreDisplay.style.display = "inline-block"; // 表示
  }
});

/**
 * 時計SVGを生成する関数
 * @param {number} hours   現在時刻(時)
 * @param {number} minutes 現在時刻(分)
 * @param {number} seconds 現在時刻(秒)
 * @return {string} 時計SVGを表す文字列
 *
 * 時計の針や文字盤を描画したSVG文字列を返す
 * hours,minutes,secondsに応じて針を回転させる
 */
function generateClockSVG(hours, minutes, seconds) {
  const circleRadius = 140; // 時計外周の円の半径
  const dialRadius = 120; // 文字盤数字配置用の半径
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgSize} ${svgSize}" width="${svgSize}" height="${svgSize}">
  <circle cx="150" cy="150" r="${circleRadius}" fill="white" stroke="black" stroke-width="4"/>
  <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4"
        transform="rotate(${
          ((hours % 12) / 12) * 360 + (minutes / 60) * 30
        }, 150, 150)"/>
  <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2"
        transform="rotate(${
          (minutes / 60) * 360 + (seconds / 60) * 6
        }, 150, 150)"/>
  <line x1="150" y1="150" x2="150" y2="20" stroke="red" stroke-width="1"
        transform="rotate(${(seconds / 60) * 360}, 150, 150)"/>
  <g id="dial">
    ${Array.from({ length: 12 })
      .map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180); // 文字盤配置角度計算
        const x = 150 + dialRadius * Math.cos(angle); // 文字配置x座標
        const y = 150 + dialRadius * Math.sin(angle); // 文字配置y座標
        const number = i === 0 ? 12 : i; // 文字盤の数
        return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="16" font-family="Arial">${number}</text>`;
      })
      .join("")}
  </g>
</svg>
  `;
}

/**
 * 現在時刻(時分秒)を返す関数
 * @return {{hours:number, minutes:number, seconds:number}} 時・分・秒を持つオブジェクト
 *
 * 現在の日時から、時・分・秒を取得しオブジェクトで返す
 */
function getCurrentTime() {
  const now = new Date(); // 現在時刻取得
  return {
    hours: now.getHours(), // 時
    minutes: now.getMinutes(), // 分
    seconds: now.getSeconds(), // 秒
  };
}

/**
 * パズルを初期化する関数
 *
 * パズル状態やタイマーをリセットし、ピースをランダムにシャッフルして表示する
 * タイマー開始や、表示用DOMの初期化なども行う
 */
function initPuzzle() {
  isCompleted = false; // 完成フラグリセット
  moveCount = 0; // 手数リセット
  scoreDisplay.style.display = "none"; // スコア表示消去

  puzzleContainer.classList.remove("completed-clock", "complete-animation");
  puzzleContainer.classList.add("puzzle-in-progress");
  puzzleContainer.innerHTML = ""; // パズル領域クリア

  if (updateClockInterval) {
    clearInterval(updateClockInterval); // 時計更新タイマー停止
    updateClockInterval = null;
  }

  if (timerInterval) {
    clearInterval(timerInterval); // プレイ時間タイマー停止
  }

  startTime = new Date(); // 開始時間記録
  timerDisplay.textContent = "プレイ時間: 00:00:00"; // 初期表示
  timerInterval = setInterval(() => {
    const now = new Date();
    const elapsedSec = Math.floor((now - startTime) / 1000);
    timerDisplay.textContent = `プレイ時間: ${formatTimeHHMMSS(elapsedSec)}`;
  }, 1000); // 1秒ごとに経過時間更新

  const { hours, minutes, seconds } = getCurrentTime(); // 現在時刻取得
  const initialClockSVG = generateClockSVG(hours, minutes, seconds); // 現在時刻の時計SVG文字列
  const svgBlob = new Blob([initialClockSVG], { type: "image/svg+xml" });
  const svgURL = URL.createObjectURL(svgBlob);

  const pieceSize = svgSize / gridSize; // ピース1辺のサイズ
  const totalPieces = gridSize * gridSize; // ピース総数
  const positions = Array.from({ length: totalPieces }, (_, i) => i); // [0..n-1]
  const shuffledPositions = positions.sort(() => Math.random() - 0.5); // ピースの並びシャッフル

  shuffledPositions.forEach((position) => {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.setAttribute("data-correct-position", position);

    const x = (position % gridSize) * pieceSize; // x位置計算
    const y = Math.floor(position / gridSize) * pieceSize; // y位置計算

    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.backgroundImage = `url(${svgURL})`;
    piece.style.backgroundSize = `${svgSize}px ${svgSize}px`;
    piece.style.backgroundPosition = `-${x}px -${y}px`;
    piece.style.border = "1px solid black";
    piece.setAttribute("draggable", true);
    puzzleContainer.appendChild(piece);
  });

  const containerSize = pieceSize * gridSize; // コンテナサイズ計算
  puzzleContainer.style.width = containerSize + "px";
  puzzleContainer.style.height = containerSize + "px";
  puzzleContainer.style.display = "grid";
  puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${pieceSize}px)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, ${pieceSize}px)`;
}

/**
 * 秒数をHH:MM:SS形式の文字列に整形する関数
 * @param {number} totalSeconds 経過秒数
 * @return {string} HH:MM:SS形式の文字列
 *
 * 与えられた秒数を時・分・秒に分解し、ゼロパディングして返す
 */
function formatTimeHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const remainder = totalSeconds % 3600; // 3600秒(1時間)超過分
  const mins = Math.floor(remainder / 60);
  const secs = remainder % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

initPuzzle();

// ドラッグ開始イベント: 完成してなければドラッグ中ピースを記録
puzzleContainer.addEventListener("dragstart", (e) => {
  if (isCompleted) return;
  draggedPiece = e.target; // ドラッグ開始したピースを記憶
  draggedPiece.classList.add("dragging");
});

// ドラッグ終了イベント: ドラッグ状態リセット
puzzleContainer.addEventListener("dragend", (e) => {
  if (draggedPiece) {
    draggedPiece.classList.remove("dragging");
    draggedPiece = null;
  }
  if (targetPiece) {
    targetPiece.classList.remove("over");
    targetPiece = null;
  }
});

// ドラッグ中、他のピース上に乗ったときにハイライト付与
puzzleContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (isCompleted) return;
  const target = e.target;
  if (
    target &&
    target !== draggedPiece &&
    target.classList.contains("puzzle-piece")
  ) {
    if (targetPiece) targetPiece.classList.remove("over");
    targetPiece = target;
    targetPiece.classList.add("over");
  }
});

// ドロップ時: ピース入れ替え、正解チェック
puzzleContainer.addEventListener("drop", (e) => {
  if (isCompleted) return;
  if (draggedPiece && targetPiece) {
    moveCount++; // 1手増加

    // 背景位置入れ替え
    const tempPosition = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition =
      targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempPosition;

    // data-correct-position入れ替え
    const tempCorrectPosition = draggedPiece.getAttribute(
      "data-correct-position"
    );
    draggedPiece.setAttribute(
      "data-correct-position",
      targetPiece.getAttribute("data-correct-position")
    );
    targetPiece.setAttribute("data-correct-position", tempCorrectPosition);

    targetPiece.classList.remove("over");
    targetPiece = null;

    checkCompletion();
  }
});

/**
 * 時計を更新する関数
 * 完成後に時計が動き続けるため、定期的にSVG生成し直す
 */
function updateClock() {
  const { hours, minutes, seconds } = getCurrentTime();
  puzzleContainer.innerHTML = generateClockSVG(hours, minutes, seconds);
}

/**
 * パズル完成チェックおよびクリア処理を行う関数
 * 完成ならスコア計算し、ベストスコアをローカル保存、表示更新
 */
function checkCompletion() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  // 全ピースが正しい位置か判定
  const complete = Array.from(pieces).every((piece, index) => {
    return parseInt(piece.getAttribute("data-correct-position")) === index;
  });

  if (complete && !isCompleted) {
    isCompleted = true;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    const endTime = new Date();
    const diffMs = endTime - startTime;
    const diffSec = Math.floor(diffMs / 1000);
    const formattedTime = formatTimeHHMMSS(diffSec);

    // 完成時アラート表示
    alert(`パズル完成し、時計が再び動き出す... クリアタイム: ${formattedTime}`);

    puzzleContainer.classList.add("complete-animation");

    setTimeout(() => {
      // パズル表示領域リセット
      puzzleContainer.style.width = "";
      puzzleContainer.style.height = "";
      puzzleContainer.style.display = "";
      puzzleContainer.style.gridTemplateColumns = "";
      puzzleContainer.style.gridTemplateRows = "";

      puzzleContainer.classList.remove("puzzle-in-progress");
      puzzleContainer.classList.add("completed-clock");

      const { hours, minutes, seconds } = getCurrentTime();
      puzzleContainer.innerHTML = generateClockSVG(hours, minutes, seconds);

      updateClockInterval = setInterval(updateClock, 1000);

      timerDisplay.textContent = `プレイ時間: ${formattedTime} (完成)`;

      // スコア計算(時間・手数が少ないほど高スコア)
      let difficultyMultiplier = gridSize === 4 ? 100 : 1;
      const score =
        difficultyMultiplier *
        Math.floor((10000 / (diffMs + 1)) * (10000 / (moveCount + 1)));

      scoreDisplay.textContent = `スコア: ${score} (難易度倍率:${difficultyMultiplier}, 手数:${moveCount}, 経過ms:${diffMs})`;
      scoreDisplay.style.display = "block";

      // ベストスコア更新チェック
      const bestScoreStr = localStorage.getItem(BEST_SCORE_KEY);
      let bestScore = bestScoreStr ? parseInt(bestScoreStr, 10) : null;

      if (bestScore === null || score > bestScore) {
        bestScore = score;
        localStorage.setItem(BEST_SCORE_KEY, bestScore.toString());
      }

      bestScoreDisplay.textContent = `ベストスコア: ${bestScore}`;
      bestScoreDisplay.style.display = "inline-block";
    }, 2000);
  }
}

// リセットボタン: パズル再初期化
resetButton.addEventListener("click", () => {
  initPuzzle();
});

// 難易度変更: gridSize更新後パズル再初期化
difficultySelect.addEventListener("change", (e) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
    gridSize = value;
    initPuzzle();
  }
});
