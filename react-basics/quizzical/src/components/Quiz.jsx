import React from 'react'
import { nanoid } from 'nanoid'
import '../scss/components/Quiz.css'
import Question from './Question'

export default function Quiz({triviaData, selectAnswer, checked, checkAnswers, playAgain}) {
    const {gameChecked, questionsCorrect} =  checked
    const questionComps = triviaData.map((triviaQ, index) => 
    <div key={index}>
        <Question key={nanoid()} triviaQ={triviaQ} selectAnswer={selectAnswer} checked={checked}/> 
        <hr key={index} />
    </div>)
    return (
    <div className='quiz'>
        {
            questionComps
        }
        <div className='summary flex-column'>
            {gameChecked ? <p>{questionsCorrect} / 5 questions correct</p> : ""}
            <button id='check-answers' className='btn' onClick={gameChecked ? playAgain : checkAnswers}>{gameChecked ? 'Play Again' : 'Check Answers'}</button>
        </div>
    </div>
  )
}
