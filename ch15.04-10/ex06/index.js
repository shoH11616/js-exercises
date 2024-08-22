const template = document.createElement("template");
// テンプレートの内容を設定
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through; // 完了したタスクのテキストに取り消し線を引く
  color: #6c757d; /* グレー */
}
.form-inline {
  background-color: #f8f9fa; /* ライトグレー */
  padding: 10px;
  border-radius: 5px; // 入力フィールドが残りのスペースを占めるようにする
}
#new-todo {
  flex-grow: 1;
}
.list-group-item {
  background-color: #e9ecef; /* ライトグレー */
  border: 1px solid #ced4da; /* グレー */
}
.list-group-item.completed {
  background-color: #d4edda; /* ライトグリーン */
}
.btn-primary {
  background-color: #007bff; /* ブルー */
  border-color: #007bff; /* ブルー */
}
.btn-primary:hover {
  background-color: #0056b3; /* ダークブルー */
  border-color: #0056b3; /* ダークブルー */
}
.btn-danger {
  background-color: #dc3545; /* レッド */
  border-color: #dc3545; /* レッド */
}
.btn-danger:hover {
  background-color: #c82333; /* ダークレッド */
  border-color: #c82333; /* ダークレッド */
}
</style>

<form id="new-todo-form" class="form-inline mb-3">
  <input type="text" id="new-todo" class="form-control mr-2" placeholder="What needs to be done?" /> <!-- 新しいタスクを入力するフィールド -->
  <button class="btn btn-primary">Add</button> <!-- タスクを追加するボタン -->
</form>
<ul id="todo-list" class="list-group"></ul> <!-- タスクのリスト -->
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    this.form.addEventListener("submit", (e) => this.addTodo(e));
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim() === "") {
      return;
    }
    const todoText = this.input.value.trim();
    this.input.value = "";

    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    const toggle = document.createElement("input");
    toggle.type = "checkbox";
    toggle.classList.add("mr-2");
    toggle.addEventListener("change", () => {
      li.classList.toggle("completed", toggle.checked);
    });

    const label = document.createElement("label");
    label.textContent = todoText;

    const destroy = document.createElement("button");
    destroy.textContent = "❌";
    destroy.classList.add("btn", "btn-danger", "btn-sm");
    destroy.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(toggle);
    li.appendChild(label);
    li.appendChild(destroy);
    this.list.prepend(li);
  }
}

customElements.define("todo-app", TodoApp);
