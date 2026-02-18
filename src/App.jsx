import { useState, useEffect } from "react"
import "./style.css"
import "./App.css"

import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {

  // 🔹 1️⃣ Charger les todos depuis LocalStorage au démarrage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos")
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState("All")

  // 🔹 2️⃣ Sauvegarder automatiquement les todos à chaque changement
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  /* AJOUT */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const trimmed = newTodo.trim()
      if (!trimmed) return

      setTodos(prev => [
        ...prev,
        {
          id: Date.now(),
          text: trimmed,
          completed: false
        }
      ])

      setNewTodo("")
    }
  }

  /* TOGGLE */
  const toggleCompleted = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  /* CLEAR */
  const clearCompleted = () => {
    setTodos(prev =>
      prev.filter(todo => !todo.completed)
    )
  }

  /* FILTRE */
  const filteredTodos = () => {
    switch (filter) {
      case "Active":
        return todos.filter(todo => !todo.completed)
      case "Completed":
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  return (
    <div className="back-noire">
      <div className="page">

        <div className="bg-top">
          <h2>T O D O ☀️</h2>
        </div>

        <div className="bg-bottom">
          <div className="cards-wrapper">

            {/* ✅ COMPONENT INPUT */}
            <TodoInput
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              handleKeyDown={handleKeyDown}
            />

            {/* ✅ COMPONENT LIST + FOOTER */}
            <TodoList
              todos={todos}
              filteredTodos={filteredTodos()}
              toggleCompleted={toggleCompleted}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
            />

            <span className="drag-text">
              Drag and drop to reorder list
            </span>

          </div>
        </div>

      </div>
    </div>
  )
}

export default App
