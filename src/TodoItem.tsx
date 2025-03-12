import React from 'react'
import { Trash2, CheckCircle, Circle } from 'lucide-react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-3">
        <button onClick={() => onToggle(todo.id)}>
          {todo.completed ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <Circle className="text-gray-400" size={24} />
          )}
        </button>
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'} text-lg`}>
          {todo.text}
        </span>
      </div>
      <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-600">
        <Trash2 size={20} />
      </button>
    </div>
  )
}

export default TodoItem
