import React from 'react'
import '../scss/components/Welcome.css'

export default function Welcome({title, subtitle, btnText, btnFunc}) {
  return (
    <div className='welcome'>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <button className='btn btn-text' onClick={btnFunc}>{btnText}</button>
    </div>
  )
}
