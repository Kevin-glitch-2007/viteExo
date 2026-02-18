function TodoFooter({ todos, filter, setFilter, clearCompleted }) {

  return (
    <div className="card-footer">

      <span>
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <div className="filters">

        <span
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </span>

        <span
          className={filter === "Active" ? "active" : ""}
          onClick={() => setFilter("Active")}
        >
          Active
        </span>

        <span
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </span>

      </div>

      <span
        onClick={clearCompleted}
        style={{ cursor: "pointer" }}
      >
        Clear Completed
      </span>

    </div>
  )
}

export default TodoFooter
