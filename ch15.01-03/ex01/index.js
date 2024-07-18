// フォーム、リスト、入力フィールドの要素を取得
const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// フォームの送信イベントにリスナーを追加
form.addEventListener("submit", (e) => {
  // フォームのデフォルトの送信動作をキャンセル
  e.preventDefault(); // form のイベントのキャンセルを実施

  // 入力値が空白の場合は何もしない
  if (input.value.trim() === "") {
    return;
  }
  // 入力値を取得し、入力フィールドをクリア
  const todo = input.value.trim();
  input.value = "";

  // 新しいリストアイテム要素を作成
  const elem = document.createElement("li");

  // ラベル要素を作成し、テキストと装飾を設定
  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  // チェックボックス要素を作成し、変更イベントにリスナーを追加
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.addEventListener("change", () => {
    // チェックボックスがチェックされている場合はラベルに取り消し線を追加、そうでない場合は取り消し線を削除
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  });

  // 削除ボタン要素を作成し、クリックイベントにリスナーを追加
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    // ボタンがクリックされた場合はリストアイテムをリストから削除
    list.removeChild(elem);
  });

  // リストアイテムにチェックボックス、ラベル、削除ボタンを追加
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  // リストの先頭に新しいリストアイテムを追加
  list.prepend(elem);
});
