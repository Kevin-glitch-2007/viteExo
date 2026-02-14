import { useState } from "react"
import "./style.css"
import "./App.css"

function App() {

  /* =========================
     STATES
  ========================== */

  // Liste complète des tâches
  const [todos, setTodos] = useState([])

  // Texte tapé dans l'input
  const [newTodo, setNewTodo] = useState("")

  // Step sélectionné (one, two, three, four)
  const [selectedStep, setSelectedStep] = useState("one")

  // Filtre actif : All | Active | Completed
  const [filter, setFilter] = useState("All")



  /* =========================
     AJOUT D’UNE TÂCHE (Entrée)
  ========================== */
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      const trimmed = newTodo.trim()

      // Empêche ajout vide
      if (trimmed === "") return

      // Ajout nouvelle tâche
      setTodos(prev => [
        ...prev,
        {
          id: Date.now(),
          text: trimmed,
          step: selectedStep,
          completed: false
        }
      ])

      // Réinitialise l’input
      setNewTodo("")
    }
  }



  /* =========================
     TOGGLE COMPLETED
     (Clique sur une tâche)
  ========================== */
  const toggleCompleted = (id) => {

    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }



  /* =========================
     CLEAR COMPLETED
  ========================== */
  const clearCompleted = () => {

    // Supprime toutes les tâches completed
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
        return todos // All
    }
  }



  /* =========================
     RENDER
  ========================== */
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
            <div className="todo-card todo-input">
              <div className="new-todo">

                <input type="radio" />

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



            {/* ================= STEPS CARD ================= */}
            <div className="todo-card todo-list">

              {/* Steps one - four */}
              <div className="steps">
                {["one", "two", "three", "four"].map(step => (
                  <label key={step}>
                    <input
                      type="radio"
                      name="steps"
                      value={step}
                      checked={selectedStep === step}
                      onChange={(e) => setSelectedStep(e.target.value)}
                    />
                    <span>{step}</span>
                  </label>
                ))}
              </div>



              {/* ================= FOOTER ================= */}
              <div className="card-footer">

                {/* 🔥 Compteur intelligent :
                    compte uniquement les tâches non complétées */}
                <span>
                  {todos.filter(todo => !todo.completed).length} items left
                </span>

                {/* 🔥 Filtres */}
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

                {/* 🗑 Clear Completed */}
                <span
                  onClick={clearCompleted}
                  style={{ cursor: "pointer" }}
                >
                  Clear Completed
                </span>

              </div>
            </div>



            {/* ================= LISTE AJOUTÉE (séparée) ================= */}
            {filteredTodos().length > 0 && (

              <div className="todo-card todo-added-list">

                {filteredTodos().map(todo => (

                  <div
                    key={todo.id}
                    className="added-item"
                    onClick={() => toggleCompleted(todo.id)}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      opacity: todo.completed ? 0.5 : 1,
                      cursor: "pointer"
                    }}
                  >
                    <strong>{todo.step}</strong> — {todo.text}
                  </div>

                ))}

              </div>
            )}



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
