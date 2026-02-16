import { useState } from "react" 
import "./style.css"
import "./App.css"

function App() {

  /* =========================
     STATES
  ========================== */

  // Liste des tâches
  const [todos, setTodos] = useState([])

  // Texte de l'input
  const [newTodo, setNewTodo] = useState("")

  // Filtre actif
  const [filter, setFilter] = useState("All")



  /* =========================
     AJOUT D’UNE TÂCHE (Entrée)
  ========================== */
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      const trimmed = newTodo.trim()
      if (!trimmed) return

      setTodos(prev => [
        ...prev,
        {
          id: Date.now(),
          text: trimmed,
          completed: false // par défaut décoché
        }
      ])

      setNewTodo("")
    }
  }



  /* =========================
     TOGGLE COMPLETED (multi-sélection)
     🔹 maintenant on peut décocher une case déjà cochée
  ========================== */
  const toggleCompleted = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // inverse l'état
          : todo
      )
    )
  }



  /* =========================
     CLEAR COMPLETED
  ========================== */
  const clearCompleted = () => {
    setTodos(prev =>
      prev.filter(todo => !todo.completed)
    )
  }



  /* =========================
     FILTRAGE DES TÂCHES
  ========================== */
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

        {/* ================= HEADER ================= */}
        <div className="bg-top">
          <h2>T O D O ☀️</h2>
        </div>

        <div className="bg-bottom">
          <div className="cards-wrapper">

            {/* ================= INPUT CARD ================= */}
            <div className="todo-card">

              <div className="new-todo">
                {/* 🔹 Plus de case ronde ici */}
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



            {/* ================= LISTE PREND LA PLACE ================= */}
            <div className="todo-card">

              {/* LISTE DES TÂCHES */}
              {filteredTodos().map(todo => (
                <div key={todo.id} className="steps">
                  <label>

                    {/* 🔵 Case ronde fonctionnelle et toggle */}
                    <input
                      type="radio" // garde radio pour design
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



              {/* ================= FOOTER (INTOUCHÉ) ================= */}
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

            </div>



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
