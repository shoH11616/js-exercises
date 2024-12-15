const puzzleContainer = document.getElementById("puzzle-container");
let draggedPiece = null; // ドラッグ中のピース
let targetPiece = null; // ドロップ先のピース

// ピースの初期化（3×3グリッドを作成）
const positions = Array.from({ length: 9 }, (_, i) => i); // [0, 1, 2, ..., 8]
const shuffledPositions = positions.sort(() => Math.random() - 0.5); // シャッフル

// ピースを生成
shuffledPositions.forEach((position) => {
  const piece = document.createElement("div");
  piece.classList.add("puzzle-piece");
  piece.setAttribute("data-correct-position", position);

  // ピースの背景位置を設定
  const x = (position % 3) * -100; // 背景のX座標
  const y = Math.floor(position / 3) * -100; // 背景のY座標
  piece.style.backgroundPosition = `${x}px ${y}px`;

  // ドラッグ可能にする
  piece.setAttribute("draggable", true);
  puzzleContainer.appendChild(piece);
});

// ドラッグ開始
puzzleContainer.addEventListener("dragstart", (e) => {
  draggedPiece = e.target; // ドラッグ中のピースを記録
  draggedPiece.classList.add("dragging"); // 視覚的フィードバック
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
  e.preventDefault(); // デフォルト動作を無効化
  const target = e.target;
  if (
    target &&
    target !== draggedPiece &&
    target.classList.contains("puzzle-piece")
  ) {
    if (targetPiece) targetPiece.classList.remove("over"); // 既存のハイライトを解除
    targetPiece = target; // 新しいドロップ先を記録
    targetPiece.classList.add("over"); // ハイライト
  }
});

// ピースをドロップして交換
puzzleContainer.addEventListener("drop", (e) => {
  if (draggedPiece && targetPiece) {
    // 背景位置を交換（視覚的に見える部分を変更）
    const tempBackground = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition =
      targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempBackground;

    // 正しい位置データも交換
    const tempPosition = draggedPiece.getAttribute("data-correct-position");
    draggedPiece.setAttribute(
      "data-correct-position",
      targetPiece.getAttribute("data-correct-position")
    );
    targetPiece.setAttribute("data-correct-position", tempPosition);

    // ハイライトを解除
    targetPiece.classList.remove("over");
    targetPiece = null;

    // 完成判定を再度チェック
    checkCompletion();
  }
});

// 時計の針を動かす関数
function updateClock() {
  // 時計の針を取得
  const secondHand = document.getElementById("second-hand");
  const minuteHand = document.getElementById("minute-hand");
  const hourHand = document.getElementById("hour-hand");

  // 時計の針が存在しない場合は処理をスキップ
  if (!secondHand || !minuteHand || !hourHand) {
    return;
  }

  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // 針の回転角度を計算
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6; // 分針の微調整
  const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30; // 短針の微調整

  // SVG の針に角度を適用
  secondHand.setAttribute("transform", `rotate(${secondAngle}, 150, 150)`);
  minuteHand.setAttribute("transform", `rotate(${minuteAngle}, 150, 150)`);
  hourHand.setAttribute("transform", `rotate(${hourAngle}, 150, 150)`);
}

// 完成判定
function checkCompletion() {
  const pieces = document.querySelectorAll(".puzzle-piece");
  const isCompleted = Array.from(pieces).every((piece, index) => {
    return parseInt(piece.getAttribute("data-correct-position")) === index;
  });

  if (isCompleted) {
    alert("パズル完成！時計が見えるようになりました！");

    // 時計全体を表示
    const container = document.getElementById("puzzle-container");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.width = "300px";
    container.style.height = "300px";
    container.style.border = "none";
    container.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
        <circle cx="150" cy="150" r="140" fill="white" stroke="black" stroke-width="4"/>
        <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4" id="hour-hand"/>
        <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" id="minute-hand"/>
        <line x1="150" y1="150" x2="150" y2="20" stroke="red" stroke-width="1" id="second-hand"/>
        <g id="dial">
          ${Array.from({ length: 12 })
            .map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180); // 時計の角度を計算 (-90°で開始位置を上に調整)
              const x = 150 + 120 * Math.cos(angle); // x座標 (中心 150 + 半径 120 * cos(角度))
              const y = 150 + 120 * Math.sin(angle); // y座標 (中心 150 + 半径 120 * sin(角度))
              const number = i === 0 ? 12 : i; // 数字が0のとき12を表示
              return `<text x="${x}" y="${y}" text-anchor="middle" font-size="16" font-family="Arial">${number}</text>`;
            })
            .join("")}
        </g>
      </svg>
    `;
    updateClock(); // 初期状態で時計の針を動かす
  }
}

// 時計の針を1秒ごとに更新
setInterval(updateClock, 1000);
updateClock(); // 初期状態で呼び出し
