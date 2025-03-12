import React, { useState, useEffect, useRef } from 'react'
import TodoItem from './TodoItem'
import { Plus } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addTodo = () => {
    if (newTodo.trim() === '') return
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    }
    setTodos([todo, ...todos])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80')" }}>
      <div className="bg-white bg-opacity-90 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Todo App</h1>
            <div className="flex mb-4">
              <input
                ref={inputRef}
                type="text"
                placeholder="Add a new todo..."
                className="flex-1 p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={addTodo}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md flex items-center"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {todos.length === 0 ? (
                <p className="text-gray-500 text-center">No todos yet. Add one!</p>
              ) : (
                todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
