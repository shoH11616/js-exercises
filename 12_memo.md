### 2024/12/15 0:00

最終課題のお題は「HTML・CSS・JavaScriptなどを使って、自分が思う会心の時計を作る」というものでした。
講師陣からは、どこかに時計の要素があれば、別にそれがメインでなくてもいいといわれています。
私はこれを受けて、時計を作る際に、何か一つ面白さをプラスしたものを作りたいと思っています。
そこで、どんなものを造ればいいと思いますか？発想の手助けをしてほしいです。

そうしましたら、チャリ走のような、ジャンプアクションゲームを含んだ時計を作成したいです。HTMLとJavScriptとCSSで実現できるでしょうか？

以下のディレクトリとファイル構成で、パズルと時計を組み合わせたパズル時計を作成しています。
現段階で足りていないと思っているところは以下2点です。これは実現可能ですか？また実現可能ならどのような修正をすればいいか考えてください。

1. パズルを完成させた後に出てくるSVGと同様のものを、パズル完成前のSVGにも適用したい。つまり完成前と完成前でまったく同じものを使用するようにしたい。
2. 1と同じ考え方かもしれないが、完成前の、ピースとしてバラバラになっているSVGに関しても、長針と短針はリアルタイムに連動して、完成後同様動いててほしい。

project-directory/
├── index.html # メインHTMLファイル
├── css/
│ └── styles.css # CSSファイル
├── js/
│ └── index.js # JavaScriptファイル
├── assets/
│ └── clock-face.svg # 時計デザイン用のSVGファイル
└── README.md # プロジェクトの説明

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SVG パズル時計</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <h1>SVG パズル時計</h1>
    <p>パズルを完成させて時計を見てみましょう！</p>
    <div id="puzzle-container">
      <!-- パズルピースをランダムに配置 -->
    </div>
    <script src="js/index.js"></script>
  </body>
</html>
```

```js
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
```

```css
/* 基本スタイル */
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f9f9f9;
  margin: 0;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

#puzzle-container {
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3列 */
  grid-template-rows: repeat(3, 100px); /* 3行 */
  gap: 2px;
  width: 306px;
  margin: 0 auto;
  border: 2px solid #333;
}

.puzzle-piece {
  width: 100px;
  height: 100px;
  background-image: url("../assets/clock-face.svg"); /* SVG時計画像 */
  background-size: 300px 300px;
  border: 1px solid #ccc;
  cursor: grab;
}

.puzzle-piece.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.puzzle-piece.dragging {
  opacity: 0.7;
  cursor: grabbing;
}

.puzzle-piece.over {
  border: 2px dashed #666; /* ドロップ可能なピースをハイライト */
}
```

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <circle cx="150" cy="150" r="140" fill="white" stroke="black" stroke-width="4"/>
  <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4" id="hour-hand"/>
  <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" id="minute-hand"/>
  <line x1="150" y1="150" x2="150" y2="20" stroke="red" stroke-width="1" id="second-hand"/>
  <!-- ダイヤル（目盛り） -->
<g id="dial">
  <text x="150" y="40" text-anchor="middle" font-size="20" font-family="Arial">12</text>
  <text x="225" y="70" text-anchor="middle" font-size="16" font-family="Arial">1</text>
  <text x="260" y="150" text-anchor="middle" font-size="16" font-family="Arial">2</text>
  <text x="225" y="230" text-anchor="middle" font-size="16" font-family="Arial">3</text>
  <text x="150" y="260" text-anchor="middle" font-size="16" font-family="Arial">4</text>
  <text x="75" y="230" text-anchor="middle" font-size="16" font-family="Arial">5</text>
  <text x="40" y="150" text-anchor="middle" font-size="16" font-family="Arial">6</text>
  <text x="75" y="70" text-anchor="middle" font-size="16" font-family="Arial">7</text>
  <text x="150" y="40" text-anchor="middle" font-size="16" font-family="Arial">8</text>
  <text x="225" y="70" text-anchor="middle" font-size="16" font-family="Arial">9</text>
  <text x="260" y="150" text-anchor="middle" font-size="16" font-family="Arial">10</text>
  <text x="225" y="230" text-anchor="middle" font-size="16" font-family="Arial">11</text>
</g>
</svg>
```

### 2024/12/15 19:36

以下のディレクトリとファイル構成で、パズルと時計を組み合わせたパズル時計を作成しています。
現段階で足りていないと思っているところは以下2点です。これは実現可能ですか？また実現可能ならどのような修正をすればいいか考えてください。

1. ドロップ先のピースを強調表示しようとしているのだが、それがどうやらうまく働いていない。ユーザー側の視点に立ち、どのピースとの交換になるか視覚的にわかりやすいようにしてほしい。

project-directory/
├── index.html # メインHTMLファイル
├── css/
│ └── styles.css # CSSファイル
├── js/
│ └── index.js # JavaScriptファイル
├── assets/
│ └── clock-face.svg # 時計デザイン用のSVGファイル
└── README.md # プロジェクトの説明

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SVG パズル時計</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <h1>SVG パズル時計</h1>
    <p>パズルを完成させて時計を見てみましょう！</p>
    <div id="puzzle-container">
      <!-- パズルピースをランダムに配置 -->
    </div>
    <script src="js/index.js"></script>
  </body>
</html>
```

```js
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
```

```css
/* 基本スタイル */
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f9f9f9;
  margin: 0;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 10px;
}

#puzzle-container {
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3列 */
  grid-template-rows: repeat(3, 100px); /* 3行 */
  gap: 2px;
  width: 306px;
  margin: 0 auto;
  border: 2px solid #333;
}

.puzzle-piece {
  width: 100px;
  height: 100px;
  background-image: url("../assets/clock-face.svg"); /* SVG時計画像 */
  background-size: 300px 300px;
  border: 1px solid #ccc;
  cursor: grab;
}

.puzzle-piece.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.puzzle-piece.dragging {
  opacity: 0.5;
  cursor: grabbing;
}

.puzzle-piece.over {
  border: 2px dashed blue; /* ドロップ先のピースを強調表示 */
}
```

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <circle cx="150" cy="150" r="140" fill="white" stroke="black" stroke-width="4"/>
  <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4" id="hour-hand"/>
  <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" id="minute-hand"/>
  <line x1="150" y1="150" x2="150" y2="20" stroke="red" stroke-width="1" id="second-hand"/>
  <!-- ダイヤル（目盛り） -->
<g id="dial">
  <text x="150" y="40" text-anchor="middle" font-size="20" font-family="Arial">12</text>
  <text x="225" y="70" text-anchor="middle" font-size="16" font-family="Arial">1</text>
  <text x="260" y="150" text-anchor="middle" font-size="16" font-family="Arial">2</text>
  <text x="225" y="230" text-anchor="middle" font-size="16" font-family="Arial">3</text>
  <text x="150" y="260" text-anchor="middle" font-size="16" font-family="Arial">4</text>
  <text x="75" y="230" text-anchor="middle" font-size="16" font-family="Arial">5</text>
  <text x="40" y="150" text-anchor="middle" font-size="16" font-family="Arial">6</text>
  <text x="75" y="70" text-anchor="middle" font-size="16" font-family="Arial">7</text>
  <text x="150" y="40" text-anchor="middle" font-size="16" font-family="Arial">8</text>
  <text x="225" y="70" text-anchor="middle" font-size="16" font-family="Arial">9</text>
  <text x="260" y="150" text-anchor="middle" font-size="16" font-family="Arial">10</text>
  <text x="225" y="230" text-anchor="middle" font-size="16" font-family="Arial">11</text>
</g>
</svg>
```

### 2024/12/15 20:36

以下のディレクトリとファイル構成で、パズルと時計を組み合わせたパズル時計を作成しています。
現段階で足りていないと思っているところは以下2点です。これは実現可能ですか？また実現可能ならどのような修正をすればいいか考えてください。

1. パズル完成前・完成後両方の時計のSVGの配置をもう少し右と下にずらしたい。現状画像のように、少し枠の中央からずれてしまっている気がする。
2. パズル完成前・完成後両方の時計のSVGをもう少しサイズ感を大きくしたい。ユーザーからするとピースが小さいと操作しずらくなりそうのため。

project-directory/
├── index.html # メインHTMLファイル
├── css/
│ └── styles.css # CSSファイル
├── js/
│ └── index.js # JavaScriptファイル
├── assets/
│ └── clock-face.svg # 時計デザイン用のSVGファイル
└── README.md # プロジェクトの説明

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SVG パズル時計</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <h1>SVG パズル時計</h1>
    <p>パズルを完成させて時計を見てみましょう！</p>
    <div id="puzzle-container">
      <!-- パズルピースをランダムに配置 -->
    </div>
    <script src="js/index.js"></script>
  </body>
</html>
```

```js
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
```

```css
/* 基本スタイル */
body {
  font-family: "Roboto", sans-serif; /* フォントをモダンで読みやすいものに変更 */
  text-align: center;
  background-color: #f3f7f9; /* 青みがかった柔らかいグレー */
  margin: 0;
  padding: 40px;
  color: #4a4a4a; /* ダークグレーで目に優しい文字色 */
}

h1 {
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #2a2a2a; /* 文字を濃いグレーに */
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* パズルコンテナ */
#puzzle-container {
  display: grid;
  grid-template-columns: repeat(3, 100px); /* 3列 */
  grid-template-rows: repeat(3, 100px); /* 3行 */
  gap: 5px; /* ピース間に柔らかい間隔を追加 */
  width: 320px;
  margin: 20px auto; /* 全体を中央寄せ */
  border: 3px solid #d1d5db; /* 優しいグレーの枠線 */
  border-radius: 10px; /* 枠に丸みを追加 */
  background-color: #ffffff; /* 背景を白くしてピースを目立たせる */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 全体に軽い影を追加 */
}

/* パズルピース */
.puzzle-piece {
  width: 100px;
  height: 100px;
  background-image: url("../assets/clock-face.svg");
  background-size: 300px 300px;
  border: 1px solid #e5e7eb; /* ピースの枠を柔らかいグレーに */
  cursor: grab;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease; /* 滑らかな動き */
}

.puzzle-piece:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* ホバー時に影を強調 */
  transform: scale(1.05); /* ピースを少し拡大 */
}

.puzzle-piece.dragging {
  opacity: 0.7; /* ドラッグ中に透明度を少し下げる */
  cursor: grabbing;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* ドラッグ中に影を強調 */
}

.puzzle-piece.over {
  border: 2px solid #a3d8f4; /* 柔らかい水色の枠線 */
  background-color: rgba(163, 216, 244, 0.3); /* 水色の透明背景 */
  box-shadow: 0 0 15px rgba(163, 216, 244, 0.7); /* 強調する影 */
}

/* レスポンシブ対応 */
@media (max-width: 400px) {
  #puzzle-container {
    width: 90%; /* 横幅を画面に合わせて調整 */
    grid-template-columns: repeat(3, 1fr); /* フレキシブルな幅 */
    grid-template-rows: repeat(3, auto);
  }

  .puzzle-piece {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1; /* 正方形を維持 */
  }
}
```

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <circle cx="150" cy="150" r="140" fill="white" stroke="black" stroke-width="4"/>
  <line x1="150" y1="150" x2="150" y2="50" stroke="black" stroke-width="4" id="hour-hand"/>
  <line x1="150" y1="150" x2="150" y2="30" stroke="black" stroke-width="2" id="minute-hand"/>
  <line x1="150" y1="150" x2="150" y2="20" stroke="red" stroke-width="1" id="second-hand"/>
  <!-- ダイヤル（目盛り） -->
<g id="dial">
  <text x="150" y="40" text-anchor="middle" font-size="20" font-family="Arial">12</text>
  <text x="225" y="70" text-anchor="middle" font-size="16" font-family="Arial">1</text>
  <text x="260" y="150" text-anchor="middle" font-size="16" font-family="Arial">2</text>
  <text x="225" y="230" text-anchor="middle" font-size="16" font-family="Arial">3</text>
  <text x="150" y="260" text-anchor="middle" font-size="16" font-family="Arial">4</text>
  <text x="75" y="230" text-anchor="middle" font-size="16" font-family="Arial">5</text>
  <text x="40" y="150" text-anchor="middle" font-size="16" font-family="Arial">6</text>
  <text x="75" y="70" text-anchor="middle" font-size="16" font-family="Arial">7</text>
  <text x="150" y="40" text-anchor="middle" font-size="16" font-family="Arial">8</text>
  <text x="225" y="70" text-anchor="middle" font-size="16" font-family="Arial">9</text>
  <text x="260" y="150" text-anchor="middle" font-size="16" font-family="Arial">10</text>
  <text x="225" y="230" text-anchor="middle" font-size="16" font-family="Arial">11</text>
</g>
</svg>
```
