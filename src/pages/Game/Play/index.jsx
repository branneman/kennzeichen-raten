import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import Button from '../../../components/Button'
import LicensePlate from '../../../components/LicensePlate'
import { useTranslation } from '../../../hooks/translation'
import {
  formatNamesake,
  namesakeEqualsDistrict,
} from '../../../util/clean'
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

export default function Play() {
  const { t } = useTranslation()

  const [gameState, setGameState] = useState(null)
  const [showingQuestion, setShowingQuestion] =
    useState(true)
  const { mode, difficulty: difficultyStr } = useParams()

  if (!hasStarted(gameState)) {
    setGameState(
      generateNewGameState(
        mode,
        difficultyStr2Int(difficultyStr),
      ),
    )
    return null // rerender
  }

  if (isDone(gameState) && showingQuestion) {
    const results = getResults(gameState)
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
          {t(
            `pages.Game.ChooseDifficulty.difficulty-${difficultyStr}`,
          )}
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

  const addAnswerToGameState = (q, a) => {
    setShowingQuestion(false)
    setGameState(answerQuestion(gameState, q, a))
    setTimeout(() => setShowingQuestion(true), 1500)
  }

  let questionNumber = 1 + gameState.answers.length

  let question
  let choices
  let isCorrect = false

  if (showingQuestion) {
    const q = getCurrentQuestion(gameState)
    question = q.question
    choices = q.choices
  } else {
    questionNumber -= 1
    const q = getLastAnswer(gameState)
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
        {gameState.questions.length}
      </p>

      {mode === 'guess-district' ? (
        <>
          <h2>{t('pages.Game.Play.license-plate')}:</h2>
          <LicensePlate
            prefix={question.code}
            code={question.plate}
          />
          <h2>{t('pages.Game.Play.question-district')}</h2>
        </>
      ) : (
        <>
          <p>District:</p>
          <h2>
            {formatNamesake(question.namesake)}
            {!namesakeEqualsDistrict(
              question.namesake,
              question.district,
            ) && ` (${question.district})`}
            , {question.state}
          </h2>
          <h3>{t('pages.Game.Play.question-code')}</h3>
        </>
      )}

      {showingQuestion ? (
        <ol
          className={`game-play__answerlist game-play__answerlist--${mode}`}
        >
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
                {mode === 'guess-district' ? (
                  <>
                    {formatNamesake(choice.namesake)}
                    {!namesakeEqualsDistrict(
                      choice.namesake,
                      choice.district,
                    ) && ` (${choice.district})`}
                    , {choice.state}
                  </>
                ) : (
                  choice.code
                )}
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
