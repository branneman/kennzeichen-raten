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
  answerQuestion,
  getResults,
} from '../../../util/game'
import './index.css'

export default function PlayGame() {
  const [gameState, setGameState] = useState<Game | null>(
    null,
  )
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
  if (isDone(gameState)) {
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

  // Started + In-progress => Show question
  const { question, choices } = getCurrentQuestion(
    gameState as Game,
  )
  const answer = (q: AreaCode, a: AreaCode) => {
    setGameState(answerQuestion(gameState as Game, q, a))
  }

  return (
    <>
      <h2>This license plate:</h2>
      <LicensePlate prefix={question.code} />

      <h2>Where is it from?</h2>
      <ol className="game-play__answerlist">
        {choices.map((choice, idx) => (
          <li
            key={`${choice.code} ${idx}`}
            className="game-play__answerlistitem"
          >
            <button
              className="game-play__answer"
              onClick={() => answer(question, choice)}
            >
              {choice.namesake}
              {choice.namesake !== choice.district &&
                ` (${choice.district})`}
              , {choice.state}
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}
