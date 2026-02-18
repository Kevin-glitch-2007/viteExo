function TodoInput({ newTodo, setNewTodo, handleKeyDown }) {

  return (
    <div className="todo-card">
      <div className="new-todo">

        <input
          type="text"
          className="todo-text-input"
          placeholder="Create a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />

      </div>
    </div>
  )
}

export default TodoInput
