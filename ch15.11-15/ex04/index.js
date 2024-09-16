// フォーム、リスト、入力フィールドの要素を取得
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// localStorage から ToDo リストを読み込む
const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  list.innerHTML = ""; // リストをクリア
  todos.forEach((todo) => {
    addTodoToList(todo.text, todo.completed);
  });
};

// ToDo リストを localStorage に保存する
const saveTodos = () => {
  const todos = [];
  list.querySelectorAll("li").forEach((item) => {
    const text = item.querySelector("label").textContent;
    const completed = item.querySelector("input[type='checkbox']").checked;
    todos.push({ text, completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

// フォームの送信イベントにリスナーを追加
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";
  addTodoToList(todo, false);
  saveTodos();
});

// ToDo リストにアイテムを追加する関数
const addTodoToList = (text, completed) => {
  const elem = document.createElement("li");
  const label = document.createElement("label");
  label.textContent = text;
  label.style.textDecorationLine = completed ? "line-through" : "none";
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = completed;
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    saveTodos();
  });
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    list.removeChild(elem);
    saveTodos();
  });
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
};

// ページ読み込み時に ToDo リストを読み込む
window.addEventListener("load", loadTodos);

// localStorage の変更を監視する
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos();
  }
});

// localStorage が利用可能かチェックする関数
const isLocalStorageAvailable = () => {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// localStorage が利用できない場合の代替処理
if (!isLocalStorageAvailable()) {
  alert(
    "localStorage が利用できません。データはセッション中のみ保持されます。"
  );
  const sessionTodos = [];
  const saveSessionTodos = () => {
    sessionTodos.length = 0;
    list.querySelectorAll("li").forEach((item) => {
      const text = item.querySelector("label").textContent;
      const completed = item.querySelector("input[type='checkbox']").checked;
      sessionTodos.push({ text, completed });
    });
  };
  const loadSessionTodos = () => {
    list.innerHTML = "";
    sessionTodos.forEach((todo) => {
      addTodoToList(todo.text, todo.completed);
    });
  };
  form.addEventListener("submit", saveSessionTodos);
  list.addEventListener("change", saveSessionTodos);
  list.addEventListener("click", saveSessionTodos);
  window.addEventListener("load", loadSessionTodos);
}
