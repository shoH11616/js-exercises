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
  try {
    disableForm(); // フォームを無効化
    const response = await retryWithExponentialBackoff(
      () => fetchWithTimeout("/api/tasks"),
      3
    );
    const data = await response.json();
    data.items.forEach((task) => appendToDoItem(task)); // 取得したタスクをリストに追加
  } catch (error) {
    alert(error.message); // エラーメッセージを表示
  } finally {
    enableForm(); // フォームを有効化
  }
});

/**
 * フォームの送信イベントリスナー
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // デフォルトのフォーム送信を防止

  const todo = input.value.trim();
  if (todo === "") {
    return; // 入力が空の場合は何もしない
  }

  input.value = ""; // 入力フィールドをクリア

  try {
    disableForm(); // フォームを無効化
    const response = await retryWithExponentialBackoff(
      () =>
        fetchWithTimeout("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ name: todo }), // 新しいタスクを送信
        }),
      3
    );
    const newTask = await response.json();
    appendToDoItem(newTask); // 新しいタスクをリストに追加
  } catch (error) {
    alert(error.message); // エラーメッセージを表示
  } finally {
    enableForm(); // フォームを有効化
  }
});

/**
 * タスクをリストに追加する関数
 * @param {Object} task - 追加するタスクオブジェクト
 * @param {string} task.name - タスクの名前
 * @param {string} task.status - タスクのステータス（"completed"または"active"）
 * @param {number} task.id - タスクのID
 */
function appendToDoItem(task) {
  const elem = document.createElement("li"); // 新しいリストアイテムを作成

  const label = document.createElement("label");
  label.textContent = task.name; // タスクの名前を設定
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none"; // タスクのステータスに応じてスタイルを設定

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed"; // チェックボックスの状態を設定
  toggle.addEventListener("change", async () => {
    try {
      disableForm(); // フォームを無効化
      const response = await retryWithExponentialBackoff(
        () =>
          fetchWithTimeout(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              status: toggle.checked ? "completed" : "active", // タスクのステータスを更新
            }),
          }),
        3
      );
      const updatedTask = await response.json();
      label.style.textDecorationLine =
        updatedTask.status === "completed" ? "line-through" : "none"; // 更新されたステータスに応じてスタイルを設定
    } catch (error) {
      alert(error.message); // エラーメッセージを表示
    } finally {
      enableForm(); // フォームを有効化
    }
  });

  const destroy = document.createElement("button");
  destroy.textContent = "Delete";
  destroy.addEventListener("click", async () => {
    try {
      disableForm(); // フォームを無効化
      const response = await retryWithExponentialBackoff(
        () =>
          fetchWithTimeout(`/api/tasks/${task.id}`, {
            method: "DELETE",
          }),
        3
      );
      if (response.ok) {
        elem.remove(); // タスクをリストから削除
      }
    } catch (error) {
      alert(error.message); // エラーメッセージを表示
    } finally {
      enableForm(); // フォームを有効化
    }
  });

  elem.appendChild(toggle); // チェックボックスをリストアイテムに追加
  elem.appendChild(label); // ラベルをリストアイテムに追加
  elem.appendChild(destroy); // 削除ボタンをリストアイテムに追加
  list.prepend(elem); // タスクをリストの先頭に追加
}

/**
 * 指定された関数を最大リトライ回数まで実行し、成功するまで指数バックオフでリトライする関数
 * @param {Function} fetchFunc - 実行する関数
 * @param {number} maxRetry - 最大リトライ回数
 * @returns {Promise<Response>} - 成功した場合のレスポンス
 * @throws {Error} - 最大リトライ回数を超えた場合のエラー
 */
async function retryWithExponentialBackoff(fetchFunc, maxRetry) {
  let attempt = 0;

  while (attempt < maxRetry) {
    try {
      const response = await fetchFunc();
      if (response && response.ok) {
        // responseがundefinedでないことを確認
        return response;
      } else if (response && response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      if (attempt >= maxRetry) {
        throw error;
      }
      const delay = Math.pow(2, attempt) * 1000; // 指数バックオフで遅延を設定
      await new Promise((resolve) => setTimeout(resolve, delay)); // 遅延を待つ
      attempt++;
    }
  }
}

/**
 * 指定されたリソースをタイムアウト付きでフェッチする関数
 * @param {string} resource - フェッチするリソースのURL
 * @param {Object} options - フェッチオプション
 * @param {number} [options.timeout=3000] - タイムアウト時間（ミリ秒）
 * @returns {Promise<Response>} - フェッチのレスポンス
 * @throws {Error} - タイムアウトまたはフェッチエラー
 */
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => {
    console.log("Request timed out");
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal, // AbortControllerのシグナルを設定
    });
    clearTimeout(id); // タイムアウトをクリア
    return response;
  } catch (error) {
    clearTimeout(id); // タイムアウトをクリア
    if (error.name === "AbortError") {
      console.error("Fetch aborted due to timeout");
      alert("Request timed out");
      throw new Error("Request timed out");
    }
    throw error;
  }
}

/**
 * フォームを無効化する関数
 */
function disableForm() {
  form.querySelector("button").disabled = true; // フォームのボタンを無効化
  input.disabled = true; // 入力フィールドを無効化
  list
    .querySelectorAll("input, button")
    .forEach((elem) => (elem.disabled = true)); // リスト内のすべての入力とボタンを無効化
}

/**
 * フォームを有効化する関数
 */
function enableForm() {
  form.querySelector("button").disabled = false; // フォームのボタンを有効化
  input.disabled = false; // 入力フィールドを有効化
  list
    .querySelectorAll("input, button")
    .forEach((elem) => (elem.disabled = false)); // リスト内のすべての入力とボタンを有効化
}
