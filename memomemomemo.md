1. indexedDB を用いて、一度閉じて再度開いても、画面更新しても、ToDo の内容が維持される。

2. 複数のタブで ToDo 管理アプリケーションを開いている状態で、あるタブでの変更が他のタブにも自動的に反映されるようにしなさい。(例：タブ A とタブ B を開いている状態で、タブ A で ToDo を追加し、タブ B に切り替えると タブ A で追加した ToDo が表示される)

上の2を満たすToDoWebアプリを作成するために、以下のindex.html, index.jsを作成し、以下のindex.spec.jsでテストを実施しました。

```html
<!doctype html>
<html lang="ja">
  <head>
    <title>Simple ToDo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <script type="module" src="/ch15.01-03/ex01/index.js"></script>
  </head>
  <body>
    <!-- 新しいToDoアイテムを追加するためのフォーム -->
    <form id="new-todo-form">
      <!-- ユーザーが新しいToDoアイテムを入力するためのテキストボックス -->
      <input type="text" id="new-todo" placeholder="What needs to be done?" />
      <!-- フォームを送信するためのボタン -->
      <button type="submit">Add</button>
    </form>
    <!-- ToDoリストを表示するための領域 -->
    <ul id="todo-list"></ul>
  </body>
</html>
```

```js (index.js)
// フォーム、リスト、入力フィールドの要素を取得
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// IndexedDBの設定
const dbName = "todoDB";
const storeName = "todos";
let db;

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
};

request.onsuccess = (event) => {
  db = event.target.result;
  loadTodos();
};

request.onerror = (event) => {
  console.error("IndexedDB error:", event.target.errorCode);
};

// ToDoリストをロードする関数
function loadTodos() {
  const transaction = db.transaction([storeName], "readonly");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const todos = event.target.result;
    todos.forEach((todo) => {
      addTodoToList(todo);
    });
  };
}

// ToDoをリストに追加する関数
function addTodoToList(todo) {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.text;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.completed;
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    updateTodo(todo.id, { completed: toggle.checked });
  });

  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
    deleteTodo(todo.id);
  });

  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

// ToDoをIndexedDBに保存する関数
function saveTodoToDB(todo) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.add(todo);

  request.onsuccess = () => {
    broadcastChange();
  };
}

// ToDoを更新する関数
function updateTodo(id, updates) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.get(id);

  request.onsuccess = (event) => {
    const todo = event.target.result;
    Object.assign(todo, updates);
    const updateRequest = objectStore.put(todo);

    updateRequest.onsuccess = () => {
      broadcastChange();
    };
  };
}

// ToDoを削除する関数
function deleteTodo(id) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.delete(id);

  request.onsuccess = () => {
    broadcastChange();
  };
}

// フォームの送信イベントにリスナーを追加
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value.trim() === "") {
    return;
  }

  const todo = {
    text: input.value.trim(),
    completed: false,
  };

  input.value = "";
  saveTodoToDB(todo);
  addTodoToList(todo);
});

// BroadcastChannelを使用して変更を通知
const channel = new BroadcastChannel("todo-channel");

channel.onmessage = () => {
  list.innerHTML = "";
  loadTodos();
};

function broadcastChange() {
  channel.postMessage("change");
}
```

```js (index.spec.js)
import { expect, test } from "@playwright/test";

/**
 * @param {import("@playwright/test").Page} page
 * @param {string} todo
 */
async function addToDo(page, todo) {
  await page.getByRole("textbox").fill(todo);
  await page.getByRole("button", { name: "Add" }).click();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function checkToDo(page, index) {
  await page.getByRole("listitem").nth(index).getByRole("checkbox").check();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
async function deleteToDo(page, index) {
  await page
    .getByRole("listitem")
    .nth(index)
    .getByRole("button", { name: "❌" })
    .click();
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function countToDos(page) {
  return await page.getByRole("listitem").count();
}

/**
 * @param {import("@playwright/test").Page} page
 * @param {number} index
 */
function queryToDo(page, index) {
  return page.getByRole("listitem").nth(index);
}

test.describe("simple todo app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.11-15/ex05");
  });

  test("no default todos", async ({ page }) => {
    expect(await countToDos(page)).toBe(0);
  });

  test("add new todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("add multiple todos", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("delete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await deleteToDo(page, 0);

    expect(await countToDos(page)).toBe(1);

    const todo = queryToDo(page, 0);
    const label = todo.getByText("質問表に質問を記載する");
    await expect(label).toBeVisible();
    await expect(label).toHaveCSS("text-decoration-line", "none");
  });

  test("complete todo", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");
    await checkToDo(page, 1);

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "line-through");
  });

  test("persist todos after reload", async ({ page }) => {
    await addToDo(page, "質問表に質問を記載する");
    await addToDo(page, "練習問題を完了する");

    await page.reload();

    expect(await countToDos(page)).toBe(2);

    const todo1 = queryToDo(page, 0);
    const label1 = todo1.getByText("練習問題を完了する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    const todo2 = queryToDo(page, 1);
    const label2 = todo2.getByText("質問表に質問を記載する");
    await expect(label2).toBeVisible();
    await expect(label2).toHaveCSS("text-decoration-line", "none");
  });

  test("sync todos across tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto("/ch15.11-15/ex05");
    await page2.goto("/ch15.11-15/ex05");

    await addToDo(page1, "質問表に質問を記載する");

    expect(await countToDos(page1)).toBe(1);
    expect(await countToDos(page2)).toBe(1);

    const todo1 = queryToDo(page2, 0);
    const label1 = todo1.getByText("質問表に質問を記載する");
    await expect(label1).toBeVisible();
    await expect(label1).toHaveCSS("text-decoration-line", "none");

    await page1.close();
    await page2.close();
  });
});
```

このテストを実施したところ、persist todos after reloadとsync todos across tabsに対して以下のようなエラーが出ました。4) ch15.11-15\ex05\index.spec.js:115:3 › simple todo app › persist todos after reload ────────────

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 0

      119 |     await page.reload();
      120 |
    > 121 |     expect(await countToDos(page)).toBe(2);
          |                                    ^
      122 |
      123 |     const todo1 = queryToDo(page, 0);
      124 |     const label1 = todo1.getByText("練習問題を完了する");

        at C:\Users\mikis\OneDrive\デスクトップ\仕事用\JavaScriptKenshu\exercises-main-exercises\js-exercises\ch15.11-15\ex05\index.spec.js:121:36

5.  ch15.11-15\ex05\index.spec.js:134:3 › simple todo app › sync todos across tabs ────────────────

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 0

    143 |
    144 | expect(await countToDos(page1)).toBe(1);

    > 145 | expect(await countToDos(page2)).toBe(1);

          |                                     ^

    146 |
    147 | const todo1 = queryToDo(page2, 0);
    148 | const label1 = todo1.getByText("質問表に質問を記載する");

        at C:\Users\mikis\OneDrive\デスクトップ\仕事用\JavaScriptKenshu\exercises-main-exercises\js-exercises\ch15.11-15\ex05\index.spec.js:145:37

このエラーの問題点と、原因を解説したうえで、エラーを解消できるようにindex.jsを修正してください。

以下のHTMLとJSで構成されるToDoアプリをlocalStorage ではなく sessionStorage を使うように修正しなさい。
JavaScriptに関する問題です。以下のHTMLとjsで構成されるライフゲームについて、WebSocket を利用して多人数で同期してプレイできるようにしなさい。
サーバ側はあらかじめ用意してあるので、クライアント側を作成するのが課題となる。

[ex09/server.js](ex09/server.js) は、ライフゲームの盤面情報を管理し WebSocket でクライアントと送受信する WebSocket サーバーである。
15.4-10.10 で実装した updateGrid メソッドを server.js にも実装し、以下のコマンドで実行すると ws://localhost:3003 で WebSocket サーバが起動する。

```sh
node ex09/server.js
```

このサーバでは、ゲームが開始されると 1 秒に 10 回盤面を更新し、以下のメッセージをすべてのクライアントに送信する。

```json
  {
    "type": "update",
    "grid": {盤面を表すboolean二次元配列}
  }
```

また、クライアントからは WebSocket で以下のメッセージを受信し、ゲームの盤面・進行状態に反映する。

- セルの反転（盤面クリック時）

```json
  {
    "type": "toggle",
    "row": {セルの行数},
    "col": {セルの列数}
  }
```

- ゲームの一時停止

```json
{
  "type": "pause"
}
```

- ゲームの開始・再開

```json
{
  "type": "start"
}
```

以下にhtml,index.js,sever.jsの詳細を示します。

```html
<!doctype html>
<html lang="ja">
  <head>
    <title>Life Game</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <script type="module" src="/ch15.04-10/ex10/index.js"></script>
    <style>
      canvas {
        border: 1px solid black;
        display: block;
        margin-bottom: 10px;
      }
      button {
        margin-right: 5px;
      }
    </style>
  </head>
  <body>
    <canvas id="screen"></canvas>
    <button id="start">Start</button>
    <button id="pause">Pause</button>
  </body>
</html>
```

```js (index.js)
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
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");

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

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
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
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

// 初期状態のグリッドを描画
renderGrid(grid);
```

```js (server.js)
import WebSocket, { WebSocketServer } from "ws";

// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1秒当たりの更新頻度
const FRAME_RATE = 10;

// WebSocketのポート
const port = 3003;
const wss = new WebSocketServer({ port });

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );
// 停止状態
let paused = true;

wss.on("connection", (ws) => {
  // 接続されたクライアントに初期のグリッドを送信
  ws.send(JSON.stringify({ type: "update", grid }));

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    switch (data.type) {
      case "toggle": // セルの反転
        grid[data.row][data.col] = !grid[data.row][data.col];
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", grid }));
          }
        });
        break;
      case "pause": // 停止
        paused = true;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "pause" }));
          }
        });
        break;
      case "start": // 開始・再開
        paused = false;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "start" }));
          }
        });
        break;
    }
  });
});

// Life Game のルールに従ってセルを更新する
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

// 全クライアントにグリッドの状態をブロードキャストする
function broadcast(grid) {
  const message = JSON.stringify({ type: "update", grid });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// 1秒に10回グリッドを更新し、クライアントに送信する
setInterval(() => {
  if (paused) {
    return;
  }
  grid = updateGrid(grid);
  broadcast(grid);
}, 1000 / FRAME_RATE);
```
