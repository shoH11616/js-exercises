/**
 * フォーム要素を取得
 * @type {HTMLFormElement}
 */
const form = document.querySelector("#new-todo-form");

/**
 * タスクリスト要素を取得
 * @type {HTMLElement}
 */
const list = document.querySelector("#todo-list");

/**
 * 新しいタスクの入力フィールドを取得
 * @type {HTMLInputElement}
 */
const input = document.querySelector("#new-todo");

/**
 * IndexedDBのデータベース名
 * @type {string}
 */
const dbName = "todoDB";

/**
 * IndexedDBのオブジェクトストア名
 * @type {string}
 */
const storeName = "todos";

/**
 * IndexedDBのデータベースオブジェクト
 * @type {IDBDatabase}
 */
let db;

/**
 * IndexedDBのデータベースを開くリクエスト
 * @type {IDBOpenDBRequest}
 */
const request = indexedDB.open(dbName, 1);

/**
 * データベースのバージョンが変更されたときに呼び出されるイベントリスナー
 * オブジェクトストアを作成する
 */
request.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
};

/**
 * データベースの接続が成功したときに呼び出されるイベントリスナー
 * ToDoリストをロードする
 */
request.onsuccess = (event) => {
  db = event.target.result;
  loadTodos();
};

/**
 * データベースの接続が失敗したときに呼び出されるイベントリスナー
 * エラーメッセージをコンソールに表示する
 */
request.onerror = (event) => {
  console.error("IndexedDB error:", event.target.errorCode);
};

/**
 * ToDoリストをロードする関数
 */
function loadTodos() {
  const transaction = db.transaction([storeName], "readonly");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const todos = event.target.result;
    const existingIds = new Set(
      [...list.children].map((item) => parseInt(item.dataset.id))
    );
    todos.forEach((todo) => {
      if (!existingIds.has(todo.id)) {
        addTodoToList(todo);
      }
    });
  };
}

/**
 * ToDoをリストに追加する関数
 * @param {Object} todo - 追加するToDoオブジェクト
 * @param {number} todo.id - ToDoのID
 * @param {string} todo.text - ToDoのテキスト
 * @param {boolean} todo.completed - ToDoの完了状態
 */
function addTodoToList(todo) {
  const elem = document.createElement("li");
  elem.dataset.id = todo.id;

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

/**
 * ToDoをIndexedDBに保存する関数
 * @param {Object} todo - 保存するToDoオブジェクト
 * @param {string} todo.text - ToDoのテキスト
 * @param {boolean} todo.completed - ToDoの完了状態
 */
function saveTodoToDB(todo) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.add(todo);

  request.onsuccess = () => {
    broadcastChange();
  };
}

/**
 * ToDoを更新する関数
 * @param {number} id - 更新するToDoのID
 * @param {Object} updates - 更新する内容
 */
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

/**
 * ToDoを削除する関数
 * @param {number} id - 削除するToDoのID
 */
function deleteTodo(id) {
  const transaction = db.transaction([storeName], "readwrite");
  const objectStore = transaction.objectStore(storeName);
  const request = objectStore.delete(id);

  request.onsuccess = () => {
    broadcastChange();
  };
}

/**
 * フォームの送信イベントリスナー
 */
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

/**
 * BroadcastChannelを使用して変更を通知
 * @type {BroadcastChannel}
 */
const channel = new BroadcastChannel("todo-channel");

channel.onmessage = () => {
  loadTodos();
};

/**
 * 変更を通知する関数
 */
function broadcastChange() {
  channel.postMessage("change");
}
