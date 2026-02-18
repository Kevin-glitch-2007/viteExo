import TodoFooter from "./TodoFooter"

function TodoList({
  todos,
  filteredTodos,
  toggleCompleted,
  filter,
  setFilter,
  clearCompleted
}) {

  return (
    <div className="todo-card">

      {filteredTodos.map(todo => (

        <div key={todo.id} className="steps">
          <label>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
            />

            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.5 : 1
              }}
            >
              {todo.text}
            </span>

          </label>
        </div>

      ))}

      {/* ✅ FOOTER COMPONENT */}
      <TodoFooter
        todos={todos}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />

    </div>
  )
}

export default TodoList
