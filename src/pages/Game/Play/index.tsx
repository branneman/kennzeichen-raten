import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Game } from '../../../types/game'
import {
  hasStarted,
  isDone,
  difficultyStr2Int,
  generateNewGameState,
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
  // const question = getCurrentQuestion(gameState)
  return (
    <>
      <p>license plate placeholder</p>
      <pre>
        <code>{JSON.stringify(gameState, null, 2)}</code>
      </pre>
    </>
  )
}
