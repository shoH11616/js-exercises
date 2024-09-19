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
 * ページが読み込まれたときに実行されるイベントリスナー
 */
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "GET",
      credentials: "include", // クロスオリジンでの Cookie の送信を許可
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task)); // 取得したタスクをリストに追加
  } catch (error) {
    alert(error.message); // エラーメッセージを表示
  }
});

/**
 * フォームの送信イベントリスナー
 */
form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault(); // フォームのデフォルトの送信をキャンセル

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return; // 入力が空の場合は何もしない
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoElement で ToDo リストの要素として追加しなさい
  try {
    const response = await fetch("http://localhost:3001/api/tasks", {
      method: "POST",
      credentials: "include", // クロスオリジンでの Cookie の送信を許可
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ name: todo }), // 新しいタスクを送信
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const newTask = await response.json();
    appendToDoItem(newTask); // 新しいタスクをリストに追加
  } catch (error) {
    alert(error.message); // エラーメッセージを表示
  }
});

/**
 * API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する関数
 * @param {Object} task - 追加するタスクオブジェクト
 * @param {string} task.name - タスクの名前
 * @param {string} task.status - タスクのステータス（"completed"または"active"）
 * @param {number} task.id - タスクのID
 */
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name; // タスクの名前を設定
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none"; // タスクのステータスに応じてスタイルを設定

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed"; // チェックボックスの状態を設定
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/tasks/${task.id}`,
        {
          method: "PATCH",
          credentials: "include", // クロスオリジンでの Cookie の送信を許可
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            status: toggle.checked ? "completed" : "active", // タスクのステータスを更新
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedTask = await response.json();
      label.style.textDecorationLine =
        updatedTask.status === "completed" ? "line-through" : "none"; // 更新されたステータスに応じてスタイルを設定
    } catch (error) {
      alert(error.message); // エラーメッセージを表示
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener("click", async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/tasks/${task.id}`,
        {
          method: "DELETE",
          credentials: "include", // クロスオリジンでの Cookie の送信を許可
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      elem.remove(); // タスクをリストから削除
    } catch (error) {
      alert(error.message); // エラーメッセージを表示
    }
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle); // チェックボックスをリストアイテムに追加
  elem.appendChild(label); // ラベルをリストアイテムに追加
  elem.appendChild(destroy); // 削除ボタンをリストアイテムに追加
  list.prepend(elem); // タスクをリストの先頭に追加
}
