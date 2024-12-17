const puzzleContainer = document.getElementById("puzzle-container");
const timerDisplay = document.getElementById("timer-display");

let draggedPiece = null;
let targetPiece = null;

// ピースサイズとSVGの背景サイズ
const pieceSize = 100;
const svgSize = 300;

// グローバル変数
let startTime = null;
let timerInterval = null;

// 時計SVGのテンプレート
function generateClockSVG(hours, minutes, seconds) {
  const circleRadius = 140;
  const dialRadius = 120;
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
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 150 + dialRadius * Math.cos(angle);
        const y = 150 + dialRadius * Math.sin(angle);
        const number = i === 0 ? 12 : i;
        return `
          <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle"
                font-size="16" font-family="Arial">
            ${number}
          </text>
        `;
      })
      .join("")}
  </g>
</svg>
  `;
}

// 現在時刻
const now = new Date();
const seconds = now.getSeconds();
const minutes = now.getMinutes();
const hours = now.getHours();

// 時計SVGの背景画像を生成
const initialClockSVG = generateClockSVG(hours, minutes, seconds);
const svgBlob = new Blob([initialClockSVG], { type: "image/svg+xml" });
const svgURL = URL.createObjectURL(svgBlob);

// ピースの初期化（3×3）
const positions = Array.from({ length: 9 }, (_, i) => i);
const shuffledPositions = positions.sort(() => Math.random() - 0.5);

shuffledPositions.forEach((position) => {
  const piece = document.createElement("div");
  piece.classList.add("puzzle-piece");
  piece.setAttribute("data-correct-position", position);

  const x = (position % 3) * pieceSize;
  const y = Math.floor(position / 3) * pieceSize;
  piece.style.width = `${pieceSize}px`;
  piece.style.height = `${pieceSize}px`;
  piece.style.backgroundImage = `url(${svgURL})`;
  piece.style.backgroundSize = `${svgSize}px ${svgSize}px`;
  piece.style.backgroundPosition = `-${x}px -${y}px`;
  piece.style.border = "1px solid black";
  piece.setAttribute("draggable", true);
  puzzleContainer.appendChild(piece);
});

// 時間を HH:MM:SS 形式に整形
function formatTimeHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const remainder = totalSeconds % 3600;
  const mins = Math.floor(remainder / 60);
  const secs = remainder % 60;

  const hh = hours.toString().padStart(2, "0");
  const mm = mins.toString().padStart(2, "0");
  const ss = secs.toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

// パズル生成後に計測開始
startTime = new Date();
timerInterval = setInterval(() => {
  const now = new Date();
  const elapsedMs = now - startTime;
  const elapsedSec = Math.floor(elapsedMs / 1000);
  timerDisplay.textContent = `プレイ時間: ${formatTimeHHMMSS(elapsedSec)}`;
}, 1000);

// ドラッグ開始
puzzleContainer.addEventListener("dragstart", (e) => {
  draggedPiece = e.target;
  draggedPiece.classList.add("dragging");
});

// ドラッグ終了
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

// ドラッグ中
puzzleContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
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

// ドロップ
puzzleContainer.addEventListener("drop", (e) => {
  if (draggedPiece && targetPiece) {
    const tempPosition = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition =
      targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempPosition;

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

// 時計の針をリアルタイムで更新
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  puzzleContainer.innerHTML = generateClockSVG(hours, minutes, seconds);
}

// 完成判定
function checkCompletion() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const isCompleted = Array.from(pieces).every((piece, index) => {
    return parseInt(piece.getAttribute("data-correct-position")) === index;
  });

  if (isCompleted) {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }

    const endTime = new Date();
    const diffMs = endTime - startTime;
    const diffSec = Math.floor(diffMs / 1000);
    const formattedTime = formatTimeHHMMSS(diffSec);

    alert(`パズルが完成し時計が再び動き出す。クリアタイム: ${formattedTime} `);

    // クリアアニメーション
    puzzleContainer.classList.add("complete-animation");

    setTimeout(() => {
      puzzleContainer.classList.add("completed-clock");
      puzzleContainer.classList.remove("complete-animation");

      puzzleContainer.innerHTML = generateClockSVG(hours, minutes, seconds);
      setInterval(updateClock, 1000);

      timerDisplay.textContent = `プレイ時間: ${formattedTime} (完成)`;
    }, 2000);
  }
}
