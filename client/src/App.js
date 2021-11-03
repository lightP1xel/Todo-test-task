import { React, useState, useEffect, useCallback } from 'react'
import { Todo, TodoForm, Loader } from './components'
import style from './style.module.css'

export const App = () => {
  const [todos, setTodos] = useState([])
  const [editedTodo, setEditedTodo] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [currentTodo, setCurrentTodo] = useState(null)
  const [isTodosLoading, setIsTodosLoading] = useState(false)

  useEffect(() => {
    setIsTodosLoading(true)
      const getData = async () => {        
        const fetchData = await fetch('/api')
        const res = await fetchData.json()
        setTodos(res)
        setIsTodosLoading(false)
      }
        getData()
  }, []);

const addTodo = useCallback((userInput) => {
  if(userInput) {
    const newItem = {
      id: Date.now(),
      title: userInput,
      isCompleted: false,
      order: Date.now(),
    }
    setTodos([...todos, newItem])
  }
}, [todos])

const removeTodo = useCallback((id) => setTodos(todos.filter((todo) => todo.id !== id)), [todos])

const handleToggle = useCallback((id) => setTodos([...todos.map((todo) => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : {...todo})]), [todos])


const editTodo = (id, title) => {
  setEditedTodo(id)
  setInputValue(title)
}

const saveTodo = useCallback((id) => {
  let newTodo = [...todos].map((item) => {
    if(item.id === id) {
      item.title = inputValue
    }
    return item
  })
  setTodos(newTodo)
  setEditedTodo(null)
}, [inputValue, todos])

const dropHandler = (e, todo) => {
  e.preventDefault()
  setTodos(todos.map(item => {
    if(item.id === todo.id) {
      return {...item, order: currentTodo.order}
    } 
    if(item.id === currentTodo.id) {
      return {...item, order: todo.order}
    }
    return item
  }))
}

const sortTodos = (a, b) => b.order - a.order

  return (
    <div className={style.App} data-testid='appWrapper'>
      <TodoForm addTodo={addTodo}/>
      {isTodosLoading ? 
            <Loader /> : todos.sort(sortTodos).map((todo) => {
        return (
          <>
          {editedTodo === todo.id 
          ? 
          <div className={style.editWrapper}>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} className={style.editInput}/>
            <button onClick={() => saveTodo(todo.id)} className={style.editButton}>Save</button>
          </div> 
          : 
          <div 
              draggable={true}
              onDragStart={_e => setCurrentTodo(todo)}
              onDragOver={e => e.preventDefault()}
              onDrop={e => dropHandler(e, todo)}
              className={style.todoWrapper}
              data-testid='todoWrapper'
          >
            <Todo key={todo.id} todo={todo} toggleTodo={handleToggle} removeTodo={removeTodo} editTodo={editTodo} />
          </div>
          }
          </>
        )
      })}
    </div>
  )
}


