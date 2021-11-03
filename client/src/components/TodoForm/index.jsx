import React, { useState } from 'react'
import style from './style.module.css'

export const TodoForm = ({ addTodo }) => {
  const [userInput, setUserInput] = useState('')

const handleSubmit = (e) => {
  e.preventDefault()
  addTodo(userInput)
  setUserInput('')
}

const handleKeyPress = (e) => {
  if(e.key === 'Enter') {
    handleSubmit(e)
  }
}

  return (
      <form data-testid='addForm' onSubmit={handleSubmit} className={style.form}>
        <input data-testid='addInput' name='title' className={style.formInput} type="text" value={userInput} onChange={e => setUserInput(e.currentTarget.value)} onKeyDown={handleKeyPress} placeholder='Write task'/>
        <button data-testid='addButton' className={style.formButton}>Add Todo</button>
      </form>
  )
}
