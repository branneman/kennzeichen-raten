import { useState } from 'react'
import { useParams } from 'react-router-dom'

import LicensePlate from '../../../components/LicensePlate'
import { Game } from '../../../types/game'
import {
  hasStarted,
  isDone,
  difficultyStr2Int,
  generateNewGameState,
  getCurrentQuestion,
} from '../../../util/game'

export default function PlayGame() {
  const [gameState, setGameState] = useState<Game | null>(
    null,
  )
  const { difficulty: difficultyStr } = useParams()

  // Not started = Start
  if (!hasStarted(gameState)) {
    setGameState(
      generateNewGameState(
        difficultyStr2Int(difficultyStr as string),
      ),
    )
    return null // rerender
  }

  // Started + Done = Show results
  if (isDone(gameState)) {
    return (
      <>
        <p>Done!</p>
        <p>Your score: ?%</p>
      </>
    )
  }

  // Started + In-progress = Show question
  const { question, choices } = getCurrentQuestion(
    gameState as Game,
  )
  return (
    <>
      <LicensePlate prefix={question.code} />
      <pre>
        <code>{JSON.stringify(choices, null, 2)}</code>
      </pre>
    </>
  )
}
