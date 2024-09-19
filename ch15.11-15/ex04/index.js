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
 * localStorage から ToDo リストを読み込む関数
 */
const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || []; // localStorage からタスクを取得
  list.innerHTML = ""; // リストをクリア
  todos.forEach((todo) => {
    addTodoToList(todo.text, todo.completed); // タスクをリストに追加
  });
};

/**
 * ToDo リストを localStorage に保存する関数
 */
const saveTodos = () => {
  const todos = [];
  list.querySelectorAll("li").forEach((item) => {
    const text = item.querySelector("label").textContent; // タスクのテキストを取得
    const completed = item.querySelector("input[type='checkbox']").checked; // タスクの完了状態を取得
    todos.push({ text, completed }); // タスクを配列に追加
  });
  localStorage.setItem("todos", JSON.stringify(todos)); // タスクを localStorage に保存
};

/**
 * フォームの送信イベントリスナー
 */
form.addEventListener("submit", (e) => {
  e.preventDefault(); // フォームのデフォルトの送信をキャンセル
  if (input.value.trim() === "") {
    return; // 入力が空の場合は何もしない
  }
  const todo = input.value.trim(); // 入力されたタスクを取得
  input.value = ""; // 入力フィールドをクリア
  addTodoToList(todo, false); // タスクをリストに追加
  saveTodos(); // タスクを保存
});

/**
 * ToDo リストにアイテムを追加する関数
 * @param {string} text - タスクのテキスト
 * @param {boolean} completed - タスクの完了状態
 */
const addTodoToList = (text, completed) => {
  const elem = document.createElement("li"); // 新しいリストアイテムを作成
  const label = document.createElement("label");
  label.textContent = text; // タスクのテキストを設定
  label.style.textDecorationLine = completed ? "line-through" : "none"; // タスクの完了状態に応じてスタイルを設定
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = completed; // チェックボックスの状態を設定
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none"; // チェックボックスの状態に応じてスタイルを変更
    saveTodos(); // タスクを保存
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    list.removeChild(elem); // タスクをリストから削除
    saveTodos(); // タスクを保存
  });
  elem.appendChild(toggle); // チェックボックスをリストアイテムに追加
  elem.appendChild(label); // ラベルをリストアイテムに追加
  elem.appendChild(destroy); // 削除ボタンをリストアイテムに追加
  list.appendChild(elem); // タスクをリストの末尾に追加
};

/**
 * ページ読み込み時に ToDo リストを読み込むイベントリスナー
 */
window.addEventListener("load", loadTodos);

/**
 * localStorage の変更を監視するイベントリスナー
 */
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos(); // localStorage の "todos" が変更された場合に ToDo リストを読み込む
  }
});

/**
 * localStorage が利用可能かチェックする関数
 * @returns {boolean} - localStorage が利用可能かどうか
 */
const isLocalStorageAvailable = () => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true; // localStorage が利用可能
  } catch (e) {
    return false; // localStorage が利用不可
  }
};

// localStorage が利用できない場合の代替処理
if (!isLocalStorageAvailable()) {
  alert(
    "localStorage が利用できません。データはセッション中のみ保持されます。"
  );
  const sessionTodos = []; // セッション中のタスクを保持する配列
  const saveSessionTodos = () => {
    sessionTodos.length = 0;
    list.querySelectorAll("li").forEach((item) => {
      const text = item.querySelector("label").textContent; // タスクのテキストを取得
      const completed = item.querySelector("input[type='checkbox']").checked; // タスクの完了状態を取得
      sessionTodos.push({ text, completed }); // タスクを配列に追加
    });
  };
  const loadSessionTodos = () => {
    list.innerHTML = ""; // リストをクリア
    sessionTodos.forEach((todo) => {
      addTodoToList(todo.text, todo.completed); // タスクをリストに追加
    });
  };
  form.addEventListener("submit", saveSessionTodos); // フォームの送信時にタスクを保存
  list.addEventListener("change", saveSessionTodos); // リストの変更時にタスクを保存
  list.addEventListener("click", saveSessionTodos); // リストのクリック時にタスクを保存
  window.addEventListener("load", loadSessionTodos); // ページ読み込み時にタスクを読み込む
}
