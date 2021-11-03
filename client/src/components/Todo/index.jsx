import React from 'react'
import style from './style.module.css'

export const Todo = ({ todo, toggleTodo, removeTodo, editTodo }) => {
  return (
    <div data-testid='todoWrapper' key={todo.id} className={style.wrapper}>
      <div className={todo.isCompleted ? `${style.itemText} ${style.strike}` : `${style.itemText}`} onClick={() => toggleTodo(todo.id)}>
        <div>{todo.title}</div>
      </div>
      <div>
        <button className={style.actionButton} onClick={() => removeTodo(todo.id)}>X</button>
        <button className={style.actionButton} onClick={() => editTodo(todo.id, todo.title)}>Edit</button>
      </div>
    </div>
  )
}
