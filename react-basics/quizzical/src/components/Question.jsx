import React from 'react'
import Answer from './Answer'
import { nanoid } from 'nanoid'

export default function Question({triviaQ, selectAnswer, checked}) {
    const {question, answers} = triviaQ
    const AnswerComps = answers.map(answer => <Answer key={nanoid()} answer={answer} selectAnswer={selectAnswer} checked={checked} />)
  return (
    <div className='question'>
        <h3>{question}</h3>
        <div className='grid-col-2'>
            {AnswerComps}
        </div>
    </div>
  )
}
