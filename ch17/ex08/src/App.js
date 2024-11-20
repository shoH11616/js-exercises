import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]); // ToDoリストを管理する状態
  const [inputValue, setInputValue] = useState(""); // 入力フィールドの状態

  // 新しいToDoを追加する関数
  const handleAddTodo = (e) => {
    e.preventDefault(); // フォームのデフォルト動作を防止
    if (inputValue.trim() === "") return; // 空白入力を無視

    setTodos([{ text: inputValue.trim(), completed: false }, ...todos]); // 新しいToDoを先頭に追加
    setInputValue(""); // 入力フィールドをリセット
  };

  // ToDoの完了状態を切り替える関数
  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo, // 指定されたToDoのcompleted状態を反転
      ),
    );
  };

  // ToDoを削除する関数
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index)); // 指定されたToDoを削除
  };

  return (
    <div>
      <h1>Simple ToDo</h1>
      {/* ToDoを追加するフォーム */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue} // 入力フィールドの状態をバインド
          onChange={(e) => setInputValue(e.target.value)} // 入力変更時に状態を更新
        />
        <button type="submit">Add</button> {/* ToDoを追加するボタン */}
      </form>
      {/* ToDoリストの表示 */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed} // ToDoの完了状態
              onChange={() => toggleTodo(index)} // チェックボックス変更時に状態を切り替え
            />
            <label
              style={{
                textDecoration: todo.completed ? "line-through" : "none", // 完了済みの場合は取り消し線を表示
              }}
            >
              {todo.text}
            </label>
            <button onClick={() => removeTodo(index)}>❌</button> {/* ToDo削除ボタン */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
