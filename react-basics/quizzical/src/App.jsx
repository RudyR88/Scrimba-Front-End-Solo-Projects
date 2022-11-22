import React, {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import Welcome from './components/Welcome'
import Quiz from './components/Quiz';


function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [reset, setReset] = useState(false)
  const [check, setCheck] = useState({
    gameChecked: false,
    questionsCorrect: 0
  })
  const [triviaData, setTriviaData] = useState([])

  function start(){
      setGameStarted(true)
  }

  useEffect(()=>{
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => setTrivia(data.results))
  },
  [reset])


  //Knuth Shuffle
  const shuffleAnswers = (answersArr) => {
      let currIndex = answersArr.length, randomIndex
      while(currIndex != 0){
          randomIndex = Math.floor(Math.random() * currIndex)
          currIndex--
          [answersArr[currIndex], answersArr[randomIndex]] = [
              answersArr[randomIndex], answersArr[currIndex]]
      }

      return answersArr
  }

  function setTrivia(apiData){
      setTriviaData(apiData.map(triviaQ => {
          const {correct_answer, incorrect_answers, question} = triviaQ
          const questionID = nanoid();
          return {
              questionID: questionID,
              question: decode(question),
              correctAnswer: correct_answer,
              answers : setAnswers(shuffleAnswers([correct_answer, ...incorrect_answers]), correct_answer, questionID),
              answered: false,
              isCorrect: false

          }
      }))
  }

  function setAnswers(answersArr, correctAnswer, questionID){
      return answersArr.map(answer => {
          return {
              questionID: questionID,
              answerID: nanoid(),
              value: decode(answer),
              isCorrect: decode(answer) === decode(correctAnswer) ? true : false,
              isSelected: false
          }
      })
  }

  function selectAnswer(questionID, answerID){
      resetQuestion(questionID)
      setTriviaData(prevTriva => prevTriva.map(question => {
          return question.questionID === questionID ? ({
              ...question,
              answered: true,
              answers: question.answers.map(answer => answer.answerID === answerID ? (
                  {
                      ...answer,
                      isSelected: true
                  }
              ) : answer)
          }) : question
      } ))
      checkAnswer(questionID)
  }

  function resetQuestion(questionID){
    setTriviaData(prevTrivia => prevTrivia.map(question => {
      const defaultAnswers = question.answers.map(answer => ({...answer, isSelected: false}))
      return question.questionID === questionID ? 
      {...question,
        answered: false,
        isCorrect: false,
        answers: defaultAnswers
      } : question
    }))
  }

  function checkAnswer(questionID){
    setTriviaData(prevTriva => prevTriva.map(question => {
      return question.questionID === questionID ? 
      {
        ...question,
        isCorrect: question.answers.filter(answer => answer.isCorrect && answer.isSelected).length === 1 ? true : false
      } : question
    }))

  }

  function checkAnswers(){
    const questionsAnswered = triviaData.filter(questions => questions.answered === true).length
    if(questionsAnswered === 5){
      const questionsCorrect = triviaData.filter(questions => questions.isCorrect === true).length
      setCheck({
        gameChecked: true,
        questionsCorrect: questionsCorrect
      })
    }
  }

  function playAgain(){
    setReset(prev => !prev)
    setCheck({
      gameChecked: false,
      questionsCorrect: 0
    })
  }

  return (
    <main>
      {
        gameStarted ?
        <Quiz
          triviaData={triviaData}
          selectAnswer={selectAnswer}
          checked={check}
          checkAnswers={checkAnswers}
          playAgain={playAgain}
        /> :
        <Welcome
          title='Quizzical'
          subtitle='Test your trivia knowledge!'
          btnText='Start quiz'
          btnFunc={start}
      />
      }
    </main>
  )
}

export default App
