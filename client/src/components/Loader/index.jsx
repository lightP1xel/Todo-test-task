import React from 'react'
import style from './style.module.css'

export const Loader = () => {
  return (
    <div className={style.ball}>
        <div className={`${style.ball1} ${style.balls}`}></div>
        <div className={`${style.ball2} ${style.balls}`}></div>
        <div className={`${style.ball3} ${style.balls}`}></div>
    </div>
  )
}
