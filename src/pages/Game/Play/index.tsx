import { useState } from 'react'
import { useParams } from 'react-router-dom'

import LicensePlate from '../../../components/LicensePlate'
import { AreaCode } from '../../../types/area-codes'
import { Game } from '../../../types/game'
import {
  hasStarted,
  isDone,
  difficultyStr2Int,
  generateNewGameState,
  getCurrentQuestion,
  getLastAnswer,
  answerQuestion,
  getResults,
} from '../../../util/game'
import { formatNamesake } from '../../../util/clean'
import './index.css'

export default function PlayGame() {
  const [gameState, setGameState] = useState<Game | null>(
    null,
  )
  const [showingQuestion, setShowingQuestion] =
    useState(true)
  const { difficulty: difficultyStr } = useParams()

  // Not started => Start
  if (!hasStarted(gameState)) {
    setGameState(
      generateNewGameState(
        difficultyStr2Int(difficultyStr as string),
      ),
    )
    return null // rerender
  }

  // Started + Done => Show results
  if (isDone(gameState) && showingQuestion) {
    const results = getResults(gameState as Game)
    return (
      <>
        <h2>Done!</h2>
        <p>
          Your score:{' '}
          <strong>{results.percentage}% correct</strong>
        </p>
        <p>
          Correct: {results.correct}
          <br />
          Incorrect: {results.incorrect}
        </p>
      </>
    )
  }

  const addAnswerToGameState = (
    q: AreaCode,
    a: AreaCode,
  ) => {
    setShowingQuestion(false)
    setGameState(answerQuestion(gameState as Game, q, a))

    // Show next question after some time (milliseconds)
    setTimeout(() => setShowingQuestion(true), 1500)
  }

  let question: AreaCode
  let choices: AreaCode[]
  let answer: AreaCode
  let isCorrect: boolean

  if (showingQuestion) {
    const q = getCurrentQuestion(gameState as Game)
    question = q.question
    choices = q.choices
  } else {
    const q = getLastAnswer(gameState as Game)
    question = q.question
    choices = q.choices
    answer = q.answer
    isCorrect = q.isCorrect
  }

  return (
    <>
      <h2>This license plate:</h2>
      <LicensePlate
        prefix={question.code}
        code={question.plate as string}
      />

      <h2>Where is it from?</h2>
      <ol className="game-play__answerlist">
        {choices.map((choice, idx) => (
          <li
            key={`${choice.code} ${idx}`}
            className="game-play__answerlistitem"
          >
            <button
              {...{ disabled: !showingQuestion }}
              className="game-play__answer"
              onClick={() =>
                addAnswerToGameState(question, choice)
              }
            >
              {formatNamesake(choice.namesake)}
              {choice.namesake !== choice.district &&
                ` (${choice.district})`}
              , {choice.state}
            </button>

            {!showingQuestion &&
              choice === answer &&
              isCorrect === true && (
                <div className="game-play__answer--correct">
                  ✅ Correct
                </div>
              )}

            {!showingQuestion &&
              choice === answer &&
              isCorrect === false && (
                <div className="game-play__answer--incorrect">
                  ❌ Incorrect
                </div>
              )}
          </li>
        ))}
      </ol>
    </>
  )
}
