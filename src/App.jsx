import { useState } from 'react'
import './style.css'
import './App.css'

function App() {

  /* =========================
     STATES
  ========================== */
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [selectedStep, setSelectedStep] = useState("one")

  /* =========================
     AJOUT AVEC ENTRÉE
  ========================== */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {

      const trimmed = newTodo.trim()
      if (trimmed === "") return

      setTodos(prev => [
        ...prev,
        {
          id: Date.now(),
          text: trimmed,
          step: selectedStep
        }
      ])

      setNewTodo("")
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

            {/* =========================
               CARTE INPUT
            ========================== */}
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

            {/* =========================
               CARTE ONE → FOUR
            ========================== */}
            <div className="todo-card todo-list">
              <div className="steps">

                <label>
                  <input
                    type="radio"
                    name="steps"
                    value="one"
                    checked={selectedStep === "one"}
                    onChange={(e) => setSelectedStep(e.target.value)}
                  />
                  <span>one</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="steps"
                    value="two"
                    checked={selectedStep === "two"}
                    onChange={(e) => setSelectedStep(e.target.value)}
                  />
                  <span>two</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="steps"
                    value="three"
                    checked={selectedStep === "three"}
                    onChange={(e) => setSelectedStep(e.target.value)}
                  />
                  <span>three</span>
                </label>

                <label>
                  <input
                    type="radio"
                    name="steps"
                    value="four"
                    checked={selectedStep === "four"}
                    onChange={(e) => setSelectedStep(e.target.value)}
                  />
                  <span>four</span>
                </label>

              </div>

              {/* INFOS EN BAS (conservées) */}
              <div className="card-footer">
                <span>{todos.length} items left</span>

                <div className="filters">
                  <span className="active">All</span>
                  <span>Active</span>
                  <span>Completed</span>
                </div>

                <span>Clear Completed</span>
              </div>
            </div>

            {/* =========================
               LISTE AJOUTÉE EN BAS
               (SANS CASE RONDE)
            ========================== */}
            {todos.length > 0 && (
              <div className="todo-card todo-added-list">

                {todos.map(todo => (
                  <div key={todo.id} className="added-item">
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
