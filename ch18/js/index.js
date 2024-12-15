const puzzleContainer = document.getElementById("puzzle-container");
let draggedPiece = null; // ドラッグ中のピース
let targetPiece = null; // ドロップ先のピース

// ピースサイズとSVGの背景サイズ
const pieceSize = 100;
const svgSize = 300;

// 時計SVGのテンプレート（動的に針を動かすために関数化）
function generateClockSVG(hours, minutes, seconds) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgSize} ${svgSize}" width="${svgSize}" height="${svgSize}">
  <circle cx="150" cy="150" r="140" fill="white" stroke="black" stroke-width="4"/>
  <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4" id="hour-hand" 
        transform="rotate(${
          ((hours % 12) / 12) * 360 + (minutes / 60) * 30
        }, 150, 150)"/>
  <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" id="minute-hand" 
        transform="rotate(${
          (minutes / 60) * 360 + (seconds / 60) * 6
        }, 150, 150)"/>
  <line x1="150" y1="150" x2="150" y2="20" stroke="red" stroke-width="1" id="second-hand" 
        transform="rotate(${(seconds / 60) * 360}, 150, 150)"/>
  <g id="dial">
    ${Array.from({ length: 12 })
      .map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 150 + 120 * Math.cos(angle);
        const y = 150 + 120 * Math.sin(angle);
        const number = i === 0 ? 12 : i;
        return `<text x="${x}" y="${y}" text-anchor="middle" font-size="16" font-family="Arial">${number}</text>`;
      })
      .join("")}
  </g>
</svg>
  `;
}

// 現在時刻を取得
const now = new Date();
const seconds = now.getSeconds();
const minutes = now.getMinutes();
const hours = now.getHours();

// 時計SVGの背景画像を生成
const initialClockSVG = generateClockSVG(hours, minutes, seconds);
const svgBlob = new Blob([initialClockSVG], { type: "image/svg+xml" });
const svgURL = URL.createObjectURL(svgBlob);

// ピースの初期化（3×3グリッドを作成）
const positions = Array.from({ length: 9 }, (_, i) => i); // [0, 1, 2, ..., 8]
const shuffledPositions = positions.sort(() => Math.random() - 0.5); // シャッフル

// ピースを生成
shuffledPositions.forEach((position) => {
  const piece = document.createElement("div");
  piece.classList.add("puzzle-piece");
  piece.setAttribute("data-correct-position", position);

  // ピースの背景位置を設定
  const x = (position % 3) * pieceSize; // 背景のX座標
  const y = Math.floor(position / 3) * pieceSize; // 背景のY座標
  piece.style.width = `${pieceSize}px`;
  piece.style.height = `${pieceSize}px`;
  piece.style.backgroundImage = `url(${svgURL})`;
  piece.style.backgroundSize = `${svgSize}px ${svgSize}px`;
  piece.style.backgroundPosition = `-${x}px -${y}px`;
  piece.style.border = "1px solid black";

  // ドラッグ可能にする
  piece.setAttribute("draggable", true);
  puzzleContainer.appendChild(piece);
});

// ドラッグ開始
puzzleContainer.addEventListener("dragstart", (e) => {
  draggedPiece = e.target;
  draggedPiece.classList.add("dragging"); // ドラッグ中の視覚的フィードバック
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

// ドラッグが他のピース上に乗った時
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
    targetPiece.classList.add("over"); // ドロップ先のピースをハイライト
  }
});

// ピースをドロップして交換
puzzleContainer.addEventListener("drop", (e) => {
  if (draggedPiece && targetPiece) {
    // 背景位置を交換（視覚的に見える部分を変更）
    const tempPosition = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition =
      targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempPosition;

    // 正しい位置データも交換
    const tempCorrectPosition = draggedPiece.getAttribute(
      "data-correct-position"
    );
    draggedPiece.setAttribute(
      "data-correct-position",
      targetPiece.getAttribute("data-correct-position")
    );
    targetPiece.setAttribute("data-correct-position", tempCorrectPosition);

    // ハイライトを解除
    targetPiece.classList.remove("over");
    targetPiece = null;

    // 完成判定を再度チェック
    checkCompletion();
  }
});

// 時計の針をリアルタイムで更新する
function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const updatedSVG = generateClockSVG(hours, minutes, seconds);
  puzzleContainer.innerHTML = updatedSVG;
}

// 完成判定
function checkCompletion() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const isCompleted = Array.from(pieces).every((piece, index) => {
    return parseInt(piece.getAttribute("data-correct-position")) === index;
  });

  if (isCompleted) {
    alert("パズル完成！時計が見えるようになりました！");
    puzzleContainer.innerHTML = generateClockSVG(hours, minutes, seconds);

    // 時計をリアルタイムで動かす
    setInterval(updateClock, 1000);
  }
}
