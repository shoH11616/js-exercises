const puzzleContainer = document.getElementById("puzzle-container");
const timerDisplay = document.getElementById("timer-display");
const resetButton = document.getElementById("reset-button");
const difficultySelect = document.getElementById("difficulty");

let draggedPiece = null;
let targetPiece = null;

const svgSize = 300;
let gridSize = 3;

let startTime = null;
let timerInterval = null;
let updateClockInterval = null;
let isCompleted = false;

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
        return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="16" font-family="Arial">${number}</text>`;
      })
      .join("")}
  </g>
</svg>
  `;
}

function getCurrentTime() {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

function initPuzzle() {
  isCompleted = false;

  // パズル中用のクラス追加
  puzzleContainer.classList.remove("completed-clock", "complete-animation");
  puzzleContainer.classList.add("puzzle-in-progress");
  puzzleContainer.innerHTML = "";

  // 時計更新タイマー停止
  if (updateClockInterval) {
    clearInterval(updateClockInterval);
    updateClockInterval = null;
  }

  // タイマーリセット
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  startTime = new Date();
  timerDisplay.textContent = "プレイ時間: 00:00:00";
  timerInterval = setInterval(() => {
    const now = new Date();
    const elapsedSec = Math.floor((now - startTime) / 1000);
    timerDisplay.textContent = `プレイ時間: ${formatTimeHHMMSS(elapsedSec)}`;
  }, 1000);

  const { hours, minutes, seconds } = getCurrentTime();
  const initialClockSVG = generateClockSVG(hours, minutes, seconds);
  const svgBlob = new Blob([initialClockSVG], { type: "image/svg+xml" });
  const svgURL = URL.createObjectURL(svgBlob);

  const pieceSize = svgSize / gridSize;
  const totalPieces = gridSize * gridSize;
  const positions = Array.from({ length: totalPieces }, (_, i) => i);
  const shuffledPositions = positions.sort(() => Math.random() - 0.5);

  shuffledPositions.forEach((position) => {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.setAttribute("data-correct-position", position);

    const x = (position % gridSize) * pieceSize;
    const y = Math.floor(position / gridSize) * pieceSize;

    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.backgroundImage = `url(${svgURL})`;
    piece.style.backgroundSize = `${svgSize}px ${svgSize}px`;
    piece.style.backgroundPosition = `-${x}px -${y}px`;
    piece.style.border = "1px solid black";
    piece.setAttribute("draggable", true);
    puzzleContainer.appendChild(piece);
  });

  // インラインスタイルでパズル中のサイズ・レイアウト設定
  const containerSize = pieceSize * gridSize;
  puzzleContainer.style.width = containerSize + "px";
  puzzleContainer.style.height = containerSize + "px";
  puzzleContainer.style.display = "grid";
  puzzleContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${pieceSize}px)`;
  puzzleContainer.style.gridTemplateRows = `repeat(${gridSize}, ${pieceSize}px)`;
}

function formatTimeHHMMSS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const remainder = totalSeconds % 3600;
  const mins = Math.floor(remainder / 60);
  const secs = remainder % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

initPuzzle();

puzzleContainer.addEventListener("dragstart", (e) => {
  if (isCompleted) return;
  draggedPiece = e.target;
  draggedPiece.classList.add("dragging");
});

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

puzzleContainer.addEventListener("drop", (e) => {
  if (isCompleted) return;
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

function updateClock() {
  const { hours, minutes, seconds } = getCurrentTime();
  puzzleContainer.innerHTML = generateClockSVG(hours, minutes, seconds);
}

function checkCompletion() {
  const pieces = document.querySelectorAll(".puzzle-piece");
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
    const diffSec = Math.floor((endTime - startTime) / 1000);
    const formattedTime = formatTimeHHMMSS(diffSec);

    alert(
      `パズルが完成し、時計が再び動き出す...! クリアタイム: ${formattedTime}`
    );

    puzzleContainer.classList.add("complete-animation");

    setTimeout(() => {
      // パズル完成後の処理
      // インラインスタイルをリセット
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
    }, 2000);
  }
}

resetButton.addEventListener("click", () => {
  initPuzzle();
});

difficultySelect.addEventListener("change", (e) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value)) {
    gridSize = value;
    initPuzzle();
  }
});
