import React, { useState, useEffect } from "react";

function Loader() {
  return <div>Loading...</div>;
}

function TodoItem({ id, title, completed }) {
  return (
    <div className={`todo ${completed ? "completed" : "incomplete"}`} id={`todo-${id}`}>
      <div className="todo-title">{title}</div>
      <div className="todo-status">{completed ? "Complete" : "Incomplete"}</div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data.slice(0, 20));
        setLoading(false);
      });
  }, []);

  const handleCompletedChange = (event) => {
    setShowCompleted(event.target.checked);
  };

  const handleIncompleteChange = (event) => {
    setShowIncomplete(event.target.checked);
  };

  const filteredTodos = todos.filter(
    (todo) => (showCompleted && todo.completed) || (showIncomplete && !todo.completed)
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ol>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
              </li>
            ))}
          </ol>
          <div id="filter-holder">
            <label>
              <input
                type="checkbox"
                id="completed-checkbox"
                checked={showCompleted}
                onChange={handleCompletedChange}
              />
              Show completed todos
            </label>
            <label>
              <input
                type="checkbox"
                id="incompleted-checkbox"
                checked={showIncomplete}
                onChange={handleIncompleteChange}
              />
              Show incomplete todos
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
