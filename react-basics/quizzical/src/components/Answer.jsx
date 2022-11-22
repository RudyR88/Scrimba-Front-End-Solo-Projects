import React, {useState} from 'react'

export default function Answer({answer, selectAnswer, checked}) {

  const [answerEffects, setAnswerEffects] = useState({
    hover: false,
    focus: false
  })

  const {questionID, answerID, isSelected, isCorrect, value} = answer
  const {gameChecked} = checked
  const {hover, focus} = answerEffects
  const onMouseEnter = () => {setAnswerEffects(prevEffects => ({...prevEffects, hover: true}))}
  const onMouseLeave = () => {setAnswerEffects(prevEffects => ({...prevEffects, hover: false}))}
  const onFocus = () => {setAnswerEffects(prevEffects => ({...prevEffects, focus: true}))}
  const onLeave = () => {setAnswerEffects(prevEffects => ({...prevEffects, focus: false}))}

  const answerStyle = ({hover, focus}) => ({
    backgroundColor: isSelected || hover && !gameChecked || focus && !gameChecked ? '#BD5532': 
    isCorrect && !isSelected && gameChecked ? '#000' : 
    'transparent',
    color: isSelected || hover && !gameChecked || focus && !gameChecked  ? '#000' : 
    isCorrect && !isSelected && gameChecked ? '#00ff35' : '#eeeceb',
    borderColor: isCorrect && !isSelected && gameChecked ? '#00ff35' : '#BD5532'
  })

  return (
    <div>
        <button className='btn btn__answer' 
          style={answerStyle({hover, focus})} 
          onClick={()=> gameChecked === true ? "" : selectAnswer(questionID,answerID)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onLeave}
        >{value}</button>
    </div>
  )
}
