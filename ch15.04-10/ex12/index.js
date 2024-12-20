const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

/**
 * ToDoリストをレンダリング
 * @param {Array} todos - ToDoアイテムの配列
 */
function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    // ToDoアイテムの完了状態を設定
    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

// フォームの送信イベントリスナーを追加
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

// すべてのToDoを表示するリンクのクリックイベントリスナーを追加
document.querySelector("#all").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/all");
  renderTodos(todos);
});

// アクティブなToDoを表示するリンクのクリックイベントリスナーを追加
document.querySelector("#active").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/active");
  renderTodos(todos.filter((todo) => !todo.completed));
});

// 完了したToDoを表示するリンクのクリックイベントリスナーを追加
document.querySelector("#completed").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.pushState(null, "", "/ch15.04-10/ex12/completed");
  renderTodos(todos.filter((todo) => todo.completed));
});

// ブラウザの戻る/進むボタンのイベントリスナーを追加
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  if (path === "/ch15.04-10/ex12/active") {
    renderTodos(todos.filter((todo) => !todo.completed));
  } else if (path === "/ch15.04-10/ex12/completed") {
    renderTodos(todos.filter((todo) => todo.completed));
  } else {
    renderTodos(todos);
  }
});

// 初回レンダリング
renderTodos(todos);
