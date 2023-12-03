import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Button from '../../../components/Button'
import LicensePlate from '../../../components/LicensePlate'
import { useTranslation } from '../../../hooks/translation'
import {
  formatNamesake,
  namesakeEqualsDistrict,
} from '../../../util/clean'
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
import './index.css'

export default function PlayGame() {
  const { t } = useTranslation()

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
    const results = getResults(gameState!)
    return (
      <div className="game-play__results">
        <h2>{t('pages.Game.Results.title')}</h2>
        <p>
          {t('pages.Game.Results.your-score')}:{' '}
          <strong>
            {results.percentage}%{' '}
            {t('pages.Game.Results.correct')}
          </strong>
        </p>
        <p>
          {t('pages.Game.Results.difficulty')}:{' '}
          {difficultyStr}
        </p>
        <p>
          {t('pages.Game.Results.correct-#')}:{' '}
          {results.correct}
          <br />
          {t('pages.Game.Results.incorrect-#')}:{' '}
          {results.incorrect}
        </p>
        <hr />
        <Link to="/play">
          <Button>
            {t('pages.Game.Results.play-again')}
          </Button>
        </Link>
        <Link to="/">
          <Button>
            {t('pages.Game.Results.back-home')}
          </Button>
        </Link>
      </div>
    )
  }

  const addAnswerToGameState = (
    q: AreaCode,
    a: AreaCode,
  ) => {
    setShowingQuestion(false)
    setGameState(answerQuestion(gameState!, q, a))
    setTimeout(() => setShowingQuestion(true), 2000)
  }

  let questionNumber: number = 1 + gameState!.answers.length

  let question: AreaCode
  let choices: AreaCode[]
  let isCorrect: boolean = false

  if (showingQuestion) {
    const q = getCurrentQuestion(gameState!)
    question = q.question
    choices = q.choices
  } else {
    questionNumber -= 1
    const q = getLastAnswer(gameState!)
    question = q.question
    choices = q.choices
    isCorrect = q.isCorrect
  }

  return (
    <>
      <p className="game-play__qxofy">
        &raquo; {t('pages.Game.Play.question-#')}{' '}
        {questionNumber}{' '}
        {t('pages.Game.Play.question-#-from')}{' '}
        {gameState!.questions.length}
      </p>

      <h2>{t('pages.Game.Play.license-plate')}:</h2>
      <LicensePlate
        prefix={question.code}
        code={question.plate as string}
      />

      <h2>{t('pages.Game.Play.question')}</h2>
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
            ✅ {t('pages.Game.Play.correct')}
          </div>
          <div className="game-play__loader"></div>
        </>
      ) : (
        <>
          <div className="game-play__answer--incorrect">
            ❌ {t('pages.Game.Play.incorrect')}
          </div>
          <div className="game-play__loader"></div>
        </>
      )}
    </>
  )
}
