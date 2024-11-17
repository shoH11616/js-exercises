import React, { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]); // ToDoリストを管理する状態
  const [inputValue, setInputValue] = useState(""); // 入力フィールドの状態

  // 新しいToDoを追加
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setTodos([{ text: inputValue.trim(), completed: false }, ...todos]);
    setInputValue("");
  };

  // ToDoの完了状態を切り替え
  const toggleTodo = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // ToDoを削除
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Simple ToDo</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <label
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </label>
            <button onClick={() => removeTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
