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
        <p>Done!</p>
        <p>Your score: {results.percentage}%</p>
        <p>
          Correct: {results.correct}, Incorrect:{' '}
          {results.incorrect}.
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
      <LicensePlate prefix={question.code} />
      <ol>
        {choices.map((choice, idx) => (
          <li key={`${choice.code} ${idx}`}>
            <button
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
