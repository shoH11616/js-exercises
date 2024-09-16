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
