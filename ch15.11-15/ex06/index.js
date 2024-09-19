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
 * ToDoリストをロードする関数
 */
function loadTodos() {
  console.log("Loading todos from sessionStorage");
  const todos = JSON.parse(sessionStorage.getItem("todos")) || [];
  console.log("Todos loaded:", todos);
  list.innerHTML = ""; // リストをクリアしてから再構築
  todos.forEach((todo) => {
    addTodoToList(todo);
  });
}

/**
 * ToDoをリストに追加する関数
 * @param {Object} todo - 追加するToDoオブジェクト
 * @param {number} todo.id - ToDoのID
 * @param {string} todo.text - ToDoのテキスト
 * @param {boolean} todo.completed - ToDoの完了状態
 */
function addTodoToList(todo) {
  console.log("Adding todo to list:", todo);
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
 * ToDoをsessionStorageに保存する関数
 * @param {Object} todo - 保存するToDoオブジェクト
 * @param {string} todo.text - ToDoのテキスト
 * @param {boolean} todo.completed - ToDoの完了状態
 */
function saveTodoToStorage(todo) {
  console.log("Saving todo to sessionStorage:", todo);
  const todos = JSON.parse(sessionStorage.getItem("todos")) || [];
  todos.push(todo);
  sessionStorage.setItem("todos", JSON.stringify(todos));
  broadcastChange();
}

/**
 * ToDoを更新する関数
 * @param {number} id - 更新するToDoのID
 * @param {Object} updates - 更新する内容
 */
function updateTodo(id, updates) {
  console.log("Updating todo in sessionStorage:", id, updates);
  const todos = JSON.parse(sessionStorage.getItem("todos")) || [];
  const todo = todos.find((t) => t.id === id);
  Object.assign(todo, updates);
  sessionStorage.setItem("todos", JSON.stringify(todos));
  broadcastChange();
}

/**
 * ToDoを削除する関数
 * @param {number} id - 削除するToDoのID
 */
function deleteTodo(id) {
  console.log("Deleting todo from sessionStorage:", id);
  let todos = JSON.parse(sessionStorage.getItem("todos")) || [];
  todos = todos.filter((t) => t.id !== id);
  sessionStorage.setItem("todos", JSON.stringify(todos));
  broadcastChange();
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
    id: Date.now(),
    text: input.value.trim(),
    completed: false,
  };

  input.value = "";
  saveTodoToStorage(todo);
  addTodoToList(todo);
});

/**
 * BroadcastChannelを使用して変更を通知
 * @type {BroadcastChannel}
 */
const channel = new BroadcastChannel("todo-channel");

channel.onmessage = () => {
  console.log("Received message from BroadcastChannel");
  loadTodos();
};

/**
 * 変更を通知する関数
 */
function broadcastChange() {
  console.log("Broadcasting change");
  channel.postMessage("change");
}

// 初期ロード時にToDoリストをロード
loadTodos();
