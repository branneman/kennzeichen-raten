import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Button from '../../../components/Button'
import LicensePlate from '../../../components/LicensePlate'
import { namesakeEqualsDistrict } from '../../../util/clean'
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

  if (!hasStarted(gameState)) {
    setGameState(
      generateNewGameState(
        difficultyStr2Int(difficultyStr as string),
      ),
    )
    return null // rerender
  }

  if (isDone(gameState) && showingQuestion) {
    const results = getResults(gameState as Game)
    return (
      <div className="game-play__results">
        <h2>Results</h2>
        <p>
          Your score:{' '}
          <strong>{results.percentage}% correct</strong>
        </p>
        <p>
          Correct answers: {results.correct}
          <br />
          Incorrect answers: {results.incorrect}
        </p>
      </div>
    )
  }

  const addAnswerToGameState = (
    q: AreaCode,
    a: AreaCode,
  ) => {
    setShowingQuestion(false)
    setGameState(answerQuestion(gameState as Game, q, a))
    setTimeout(() => setShowingQuestion(true), 2000)
  }

  let question: AreaCode
  let choices: AreaCode[]
  let isCorrect: boolean = false

  if (showingQuestion) {
    const q = getCurrentQuestion(gameState as Game)
    question = q.question
    choices = q.choices
  } else {
    const q = getLastAnswer(gameState as Game)
    question = q.question
    choices = q.choices
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
      {showingQuestion ? (
        <ol className="game-play__answerlist">
          {choices.map((choice, idx) => (
            <li
              key={`${choice.code} ${idx}`}
              className="game-play__answerlistitem"
            >
              <Button
                {...{ disabled: !showingQuestion }}
                className="game-play__answer"
                onClick={() =>
                  addAnswerToGameState(question, choice)
                }
              >
                {formatNamesake(choice.namesake)}
                {!namesakeEqualsDistrict(
                  choice.namesake,
                  choice.district,
                ) && ` (${choice.district})`}
                , {choice.state}
              </Button>
            </li>
          ))}
        </ol>
      ) : isCorrect === true ? (
        <>
          <div className="game-play__answer--correct">
            ✅ Correct
          </div>
          <div className="game-play__loader"></div>
        </>
      ) : (
        <>
          <div className="game-play__answer--incorrect">
            ❌ Incorrect
          </div>
          <div className="game-play__loader"></div>
        </>
      )}
    </>
  )
}
